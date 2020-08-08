import './firebaseinit';
import firebase from 'firebase';

export const authMethods = {
	signin: (email, password) => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	},

	logout: () => {
		return firebase.auth().signOut();
	},

	signInAnonymously: () => {
		return firebase.auth().signInAnonymously();
	},

	createUser: (email, password) => {
		firebase.auth().createUserWithEmailAndPassword(email, password);
	},

	signInWithGoogle: () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		return firebase.auth().signInWithPopup(provider);
	},

	signInWithGitHub: () => {
		const provider = new firebase.auth.GithubAuthProvider();
		return firebase.auth().signInWithPopup(provider);
	},

	signInWithGitHubToken: () => {
		const provider = new firebase.auth.GithubAuthProvider();
		return fetch(
			'https://github.com/login/oauth/authorize?client_id=2b0c487b96dcfdab49d2&scope=repo, user&login'
		);
	}
};
