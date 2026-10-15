import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
provider.setCustomParameters({
  prompt: 'select_account'
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export interface GoogleAuthResult {
  user: User;
  idToken: string;
  accessToken?: string;
  email: string;
  fullName: string;
  photoURL?: string;
}

export const googleSignIn = async (): Promise<GoogleAuthResult> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const idToken = await result.user.getIdToken();
    
    if (credential?.accessToken) {
      cachedAccessToken = credential.accessToken;
    }

    const email = result.user.email || '';
    const fullName = result.user.displayName || email.split('@')[0] || 'Google User';
    const photoURL = result.user.photoURL || undefined;

    return {
      user: result.user,
      idToken,
      accessToken: cachedAccessToken || undefined,
      email,
      fullName,
      photoURL
    };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const googleSignOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    cachedAccessToken = null;
  } catch (error) {
    console.error('Google Sign-Out Error:', error);
  }
};
