import _ from 'lodash';

const generateHabilitations = ({
  user = {},
  organization = {},
}) => {
  const {
    _id: userId = '',
    organizationsIds: userOrganizationsIds = [],
    habilitations: userHabilitations = {},
    habilitations: {
      users: {
        create: userCanCreateUsers = false,
        read: userCanReadUsers = false,
        update: userCanUpdateUsers = false,
        delete: userCanDeleteUsers = false,
      } = {},
      organizations: {
        create: userCanCreateOrganizations = false,
        read: userCanReadOrganizations = false,
        update: userCanUpdateOrganizations = false,
        delete: userCanDeleteOrganizations = false,
      } = {},
      habilitations: {
        read: userCanReadHabilitations = false,
        update: userCanUpdateHabilitations = false,
      } = {},
      billingInformation: {
        read: userCanReadBillingInformation = false,
        update: userCanUpdateBillingInformation = false,
      } = {},
    }
  } = user;
  const {
    _id: organizationId = '',
    habilitations: organizationHabilitations = {},
    habilitations: {
      organization: {
        update: usersAuthorizedToUpdateOrganization = [],
        delete: usersAuthorizedToDeleteOrganization = [],
      } = {},
      organizationUsers: {
        create: usersAuthorizedToCreateOrganizationUsers = [],
        read: usersAuthorizedToReadOrganizationUsers = [],
        update: usersAuthorizedToUpdateOrganizationUsers = [],
        delete: usersAuthorizedToDeleteOrganizationUsers = [],
      } = {},
      organizationUsersHabilitations: {
        read: usersAuthorizedToReadOrganizationUsersHabilitations = [],
        update: usersAuthorizedToUpdateOrganizationUsersHabilitations = [],
      } = {},
      organizationBillingInformation: {
        read: usersAuthorizedToReadOrganizationBillingInformation = [],
        update: usersAuthorizedToUpdateOrganizationBillingInformation = [],
      } = {},
    } = {},
    users: organizationUsersIds = [],
  } = organization;

  // organization
  const userCanCreateOrganization = (
    userCanCreateOrganizations
  );
  const userCanReadOrganization = (
    userCanReadOrganizations
    || userOrganizationsIds.includes(userId)
  );
  const userCanUpdateOrganization = (
    userCanUpdateOrganizations
    || usersAuthorizedToUpdateOrganization.includes(userId)
  );
  const userCanDeleteOrganization = (
    userCanDeleteOrganizations
    || usersAuthorizedToDeleteOrganization.includes(userId)
  );

  // organization users
  const userCanCreateOrganizationUsers = (
    userCanCreateUsers
    || usersAuthorizedToCreateOrganizationUsers.includes(userId)
  );
  const userCanReadOrganizationUsers = (
    userCanReadUsers
    || usersAuthorizedToReadOrganizationUsers.includes(userId)
  );
  const userCanUpdateOrganizationUsers = (
    userCanUpdateUsers
    || usersAuthorizedToUpdateOrganizationUsers.includes(userId)
  );
  const userCanDeleteOrganizationUsers = (
    userCanDeleteUsers
    || usersAuthorizedToDeleteOrganizationUsers.includes(userId)
  );

  // organization habilitations
  const userCanReadOrganizationUsersHabilitations = (
    userCanReadHabilitations
    || usersAuthorizedToReadOrganizationUsersHabilitations.includes(userId)
  );
  const userCanUpdateOrganizationUsersHabilitations = (
    userCanUpdateHabilitations
    || usersAuthorizedToUpdateOrganizationUsersHabilitations.includes(userId)
  );

  // organization billing information
  const userCanReadOrganizationBillingInformation = (
    userCanReadBillingInformation
    || usersAuthorizedToReadOrganizationBillingInformation.includes(userId)
  );

  const userCanUpdateOrganizationBillingInformation = (
    userCanUpdateBillingInformation
    || usersAuthorizedToUpdateOrganizationBillingInformation.includes(userId)
  );

  const userHasAnyOrganizationGlobalRights = userCanReadOrganizations
    || userCanUpdateOrganizations
    || userCanDeleteOrganizations
    || userCanCreateUsers
    || userCanReadUsers
    || userCanUpdateUsers
    || userCanDeleteUsers
    || userCanReadHabilitations
    || userCanUpdateHabilitations
    || userCanReadBillingInformation
    || userCanUpdateBillingInformation;

  const organizationHabilitationsCheckboxesData = !_.isEmpty(organizationHabilitations)
    ? ({
      organization: {
        update: {
          value: userCanUpdateOrganization,
          disabled: userCanUpdateOrganizations,
          labelIfAuthorized: 'Can update organization\'s information',
          labelIfUnauthorized: 'Cannot update organization\'s information',
        },
        delete: {
          value: userCanDeleteOrganization,
          disabled: userCanDeleteOrganizations,
          labelIfAuthorized: 'Can delete the organization',
          labelIfUnauthorized: 'Cannot delete the organization',
        },
      },
      organizationUsers: {
        create: {
          value: userCanCreateOrganizationUsers,
          disabled: userCanCreateUsers,
          labelIfAuthorized: 'Can invite users',
          labelIfUnauthorized: 'Cannot invite users',
        },
        read: {
          value: userCanReadOrganizationUsers,
          disabled: userCanReadUsers,
          labelIfAuthorized: 'Can list users',
          labelIfUnauthorized: 'Cannot list users',
        },
        update: {
          value: userCanUpdateOrganizationUsers,
          disabled: userCanUpdateUsers,
          labelIfAuthorized: 'Can update user\'s profile',
          labelIfUnauthorized: 'Cannot update user\'s profile',
        },
        delete: {
          value: userCanDeleteOrganizationUsers,
          disabled: userCanDeleteUsers,
          labelIfAuthorized: 'Can remove users',
          labelIfUnauthorized: 'Cannot remove users',
        },
      },
      organizationUsersHabilitations: {
        read: {
          value: userCanReadOrganizationUsersHabilitations,
          disabled: userCanReadHabilitations,
          labelIfAuthorized: 'Can list users habilitations',
          labelIfUnauthorized: 'Cannot list users habilitations',
        },
        update: {
          value: userCanUpdateOrganizationUsersHabilitations,
          disabled: userCanUpdateHabilitations,
          labelIfAuthorized: 'Can update users habilitations',
          labelIfUnauthorized: 'Cannot update users habilitations',
        },
      },
      organizationBillingInformation: {
        read: {
          value: userCanReadOrganizationBillingInformation,
          disabled: userCanReadHabilitations,
          labelIfAuthorized: 'Can read billing information',
          labelIfUnauthorized: 'Cannot read billing information', 
        },
        update: {
          value: userCanUpdateOrganizationBillingInformation,
          disabled: userCanUpdateBillingInformation,
          labelIfAuthorized: 'Can update billing information',
          labelIfUnauthorized: 'Cannot update billing information',
        },
      },
    })
    : {};

  return {
    userId,
    organizationId,
    userHabilitations,
    organizationHabilitations,
    userHasAnyOrganizationGlobalRights,
    // user
    userCanCreateUsers,
    userCanReadUsers,
    userCanUpdateUsers,
    userCanDeleteUsers,
    userCanCreateOrganizations,
    userCanReadOrganizations,
    userCanUpdateOrganizations,
    userCanDeleteOrganizations,
    userCanReadHabilitations,
    userCanUpdateHabilitations,
    userCanReadBillingInformation,
    userCanUpdateBillingInformation,
    // organization
    organizationHabilitationsCheckboxesData,
    userCanCreateOrganization,
    userCanReadOrganization,
    userCanUpdateOrganization,
    userCanDeleteOrganization,
    userCanCreateOrganizationUsers,
    userCanReadOrganizationUsers,
    userCanUpdateOrganizationUsers,
    userCanDeleteOrganizationUsers,
    userCanReadOrganizationUsersHabilitations,
    userCanUpdateOrganizationUsersHabilitations,
    userCanReadOrganizationBillingInformation,
    userCanUpdateOrganizationBillingInformation,
  };
};

export default generateHabilitations;
