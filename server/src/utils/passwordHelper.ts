
type User = {
	_id: string;
	username: string;
	email: string;
	password: string;
	profilePicture: string;
	createdAt: Date;
};

export const omitPassword = (user: User) => {
	const { password, ...rest } = user;
	return rest;
};

export const verifyPassword = (password: string) => {
	const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
	
	if (!regex.test(password)) {
		return false;
	}
}

