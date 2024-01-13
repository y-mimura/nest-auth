type FirestoreAdapter =
  // @ts-expect-error @auth/firebase-adapter
  typeof import('@auth/firebase-adapter').FirestoreAdapter;
let firestoreAdapter: FirestoreAdapter;

export const loadFirestoreAdapter = async () => {
  if (!firestoreAdapter) {
    firestoreAdapter = (await eval(`import('@auth/firebase-adapter')`))
      .FirestoreAdapter;
  }
  return firestoreAdapter;
};
