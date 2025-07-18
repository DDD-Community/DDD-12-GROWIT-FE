interface UserProfile {
  id: string;
  email: string;
  name: string;
  jobRole: JobRole;
  careerYear: string;
}

export interface UserProfileData {
  data: UserProfile;
}

export interface JobRole {
  id: string;
  name: string;
}

interface JobRoles {
  jobRoles: JobRole[];
}

export interface JobRolesData {
  data: JobRoles;
}
