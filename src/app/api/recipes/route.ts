import { db } from '@/db';
import { Recipe, RecipeListItemType, RecipeListItem } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { fsDataTypeConverter } from '@/utils';
import { createRecord, updateRecord } from '@/utils/firestore-utils';
import { firestoreDatesConverter } from '@/utils/date-utils';
import { validatePayload } from '@/utils/validators';
import { recipesBucket } from '@/utils/storage-utils';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { first } from 'lodash';

export async function GET(): Promise<
  NextResponse<{ recipes: RecipeListItemType[] }>
> {
  const recipesSnapshot = await db
    .collection('recipes')
    .withConverter(fsDataTypeConverter<Recipe>())
    .withConverter(firestoreDatesConverter)
    .get();

  if (recipesSnapshot.empty) {
    return NextResponse.json({ recipes: [] });
  }

  const recipes = recipesSnapshot.docs.map((doc) =>
    RecipeListItem.parse(doc.data())
  );
  return NextResponse.json({ recipes });
}

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userSnapshot = await db
    .collection('users')
    .where('auth0Id', '==', session.user.sub)
    .get();
  const userData = first(userSnapshot.docs)?.data();

  const formData = await req.formData();

  const payload: Record<string, any> = Object.fromEntries(formData.entries());
  payload.category = formData.getAll('category') as string[];
  payload.ingredients = formData.getAll('ingredients') as string[];
  payload.authorId = userData?.id;
  payload.authorEmail = userData?.email;
  payload.authorName = userData?.firstName + ' ' + userData?.lastName;

  delete payload.files;

  const validatedPayload = validatePayload(Recipe, payload);

  if (!validatedPayload.success) {
    return NextResponse.json(
      { errors: validatedPayload.data },
      { status: 400 }
    );
  }
  const recipeDoc = await createRecord<Recipe>(
    'recipes',
    validatedPayload.data
  );

  console.log('validatedPayload > ', validatedPayload);

  const files = formData.getAll('files') as File[];
  const images: string[] = [];

  for (const file of files) {
    const result = await uploadImage(file, userData?.id, recipeDoc.id);
    images.push(result);
  }

  await updateRecord('recipes', recipeDoc.id, { images, image: images[0] });

  return NextResponse.json(
    { status: 201, message: 'Recipe created successfully' },
    { status: 201 }
  );
});

const uploadImage = async (
  file: File,
  authorId: string,
  recipeId: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = file;
      const bytes = await file.stream().getReader().read();
      const buffer = Buffer.from(bytes.value ?? new Uint8Array());

      const blob = recipesBucket.file(
        `${authorId}/${recipeId}/${name.replace(/ /g, '_')}`
      );
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.type,
      });

      blobStream
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${recipesBucket.name}/${blob.name}`;
          console.log(`${name} uploaded to ${publicUrl}`);
          resolve(publicUrl);
        })
        .on('error', (error) => {
          console.error('Upload error:', error);
          reject(new Error('Failed to upload image'));
        })
        .end(buffer);
    } catch (error) {
      console.error('Error in uploadImage:', error);
      reject(new Error('Failed to process image for upload'));
    }
  });
};
