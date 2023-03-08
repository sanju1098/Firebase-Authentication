export function authErrorMessage(error) {
	if (error === "auth/claims-too-large")
		return "Exceeds the maximum allowed size";
	if (error === "auth/email-already-exists")
		return "Entered Email already Exists";
	if (error === "auth/id-token-expired") return "Provided ID token is expired";
	if (error === "auth/id-token-revoked") return;
	if (error === "auth/insufficient-permission")
		return "Insufficient permission to access";
	if (error === "auth/internal-error")
		return "Authentication server encountered an unexpected error";
	if (error === "auth/invalid-argument")
		return "An invalid argument was provided to an Authentication";
	if (error === "auth/invalid-claims") return "Custom claim are invalid";
	if (error === "auth/invalid-continue-url") return "URL is valid";
	if (error === "auth/invalid-credential") return "Credential are Invalid";
	if (error === "auth/invalid-email") return "Email is invalid";
	if (error === "auth/missing-email") return "Enter the Email";
	if (error === "auth/email-already-in-use") return "Email is already in use";
	if (error === "auth/invalid-password") return "Password is Invalid";
	if (error === "auth/wrong-password") return "Password is Wrong";
	if (error === "auth/too-many-requests")
		return "Access to this account has been temporarily disabled due to many failed login attempts. You can try again later";
	if (error === "auth/invalid-phone-number") return "Phone Number is Invalid";
	if (error === "auth/invalid-uid") return "Provided UID is Invalid";
	if (error === "auth/missing-uid") return "UID is missing";
	if (error === "auth/phone-number-already-exists")
		return "Phone Number already exists";
	if (error === "auth/project-not-found") return "Project Not Found";
	if (error === "auth/session-cookie-expired")
		return "Session cookie is expired";
	if (error === "auth/session-cookie-revoked")
		return "Session cookie has been revoked";
	if (error === "auth/uid-already-exists")
		return "UID is already in use by an existing user";
	if (error === "auth/user-not-found") return "User not Found";
	if (error === "(auth/operation-not-allowed).") return "Cannot be performed";

	return error;
}
