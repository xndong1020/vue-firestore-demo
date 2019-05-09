import db from '@/firebase/init'

export const getAll = async () => {
  const smoothiesSnapshot = await db.collection('smoothies').get()
  const smoothies = smoothiesSnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })
  return smoothies
}

export const findById = async id => {
  const doc = await db
    .collection('smoothies')
    .doc(id)
    .get()

  if (doc.exists) return doc.data()
}

export const findBySlug = async slug => {
  const snapshot = await db
    .collection('smoothies')
    .where('slug', '==', slug)
    .get()

  const { empty, size, docs } = snapshot
  if (empty || size === 0) return null

  const smoothie = docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })[0]
  
  return smoothie
}

export const create = async smoothie => {
  const doc = await db.collection('smoothies').add(smoothie)
  return doc
}

export const update = async (id, smoothie) => {
  const doc = await db
    .collection('smoothies')
    .doc(id)
    .update(smoothie)
  return doc
}

export const deleteById = async id => {
  await await db
    .collection('smoothies')
    .doc(id)
    .delete()
}
