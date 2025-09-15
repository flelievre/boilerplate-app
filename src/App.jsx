import {
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router';
import {
  useContext,
} from 'react';
import {
  ProvidersHoc,
  LoadingPage,
  AppContext,
  RedirectProvider,
  ScrollToTop,
  ModalCreateContext,
  ModalCreate,
  ModalEditContext,
  ModalEdit,
  ModalConfirmationContext,
  ModalConfirmation,
} from '@/utils';
import {
  AuthUserContext,
  AuthUserProvider,
 } from '@/contexts';
 import {
  generateUnauthenticatedRoutes,
  generateOnboardingProfileRoutes,
  generateOnboardingOrganizationRoutes,
  generateOnboardingInvitationsRoutes,
  generateAuthenticatedRoutes,
} from '@/apps';

const AuthAwareApp = () => {
  const {
    authUser = null,
    invitations = [],
    isLoading = false,
  } = useContext(AuthUserContext) || {};
  const {
    handleChange,
    nbFormSubmissionCounter,
    hasAnError,
    handleFormAction,
    formInputsErrorsHelpers,
    isFormLoading,
    isShowingModal,
    title,
    titleIcon,
    contentText,
    submitButtonText,
    hideModal,
    isMobile,
    fields,
    formInputs,
    handleBack,
    isFirstStep,
    isLastStep,
  } = useContext(ModalCreateContext);
  const {
    fields: fieldsEdit,
    formInputs: formInputsEdit,
    handleChange: handleChangeEdit,
    isFormLoading: isFormLoadingEdit,
    nbFormSubmissionCounter: nbFormSubmissionCounterEdit,
    hasAnError: hasAnErrorEdit,
    formInputsErrorsHelpers: formInputsErrorsHelpersEdit,
    handleFormAction: handleFormActionEdit,
    isShowingModal: isShowingModalEdit,
    hideModal: hideModalEdit,
    modalTitle: modalTitleEdit,
    modalTitleIcon: modalTitleIconEdit,
    contentText: contentTextEdit,
  } = useContext(ModalEditContext);
  const {
    confirmationProvidedText,
    setConfirmationProvidedText,
    nbFormSubmissionCounter: nbFormSubmissionCounterConfirmation,
    hasAnError: hasAnErrorConfirmation,
    handleFormAction: handleFormActionConfirmation,
    isFormLoading: isFormLoadingConfirmation,
    isShowingModal: isShowingModalConfirmation,
    title: titleConfirmation,
    titleIcon: titleIconConfirmation,
    confirmationText,
    submitButtonText: submitButtonTextConfirmation,
    hideModal: hideModalConfirmation,
    type,
    confirmationLabel,
    confirmationProvidedTextErrorHelper,
    contentText: contentTextConfirmation,
  } = useContext(ModalConfirmationContext);
  const {
    t,
    generateRoute,
  } = useContext(AppContext);

  if (isLoading) {
    return (
      <LoadingPage
        t={t}
        text="Loading"
      />
    );
  }

  const {
    hasCompletedProfileOnboarding = false,
    hasCompletedOrganizationOnboarding = false,
    organizations = [],
    // isOtpAuthEnforced = false,
    // hasOtpBeenUsedOnce = false,
    // hasOtpRecoveryCodeBeenSaved = false,
    // shouldVerifyOtp = false,
  } = authUser || {};

  let routes = generateUnauthenticatedRoutes({
    t,
    generateRoute,
  });

  if (authUser) {
    // if (!hasOtpBeenUsedOnce && isOtpAuthEnforced) {
    //   routes = otpRegistrationRoutes;
    // } else if (hasOtpBeenUsedOnce && isOtpAuthEnforced && shouldVerifyOtp) {
    //   routes = otpVerificationRoutes;
    // } else if (!hasOtpRecoveryCodeBeenSaved && isOtpAuthEnforced) {
    //   routes = otpRecoveryRoutes;
    // } else if (!hasCompletedRegistration) {
    if (
      !hasCompletedProfileOnboarding
    ) {
      routes = generateOnboardingProfileRoutes({
        hasCompletedProfileOnboarding,
        generateRoute,
      });
    } else if (invitations.length > 0) {
      routes = generateOnboardingInvitationsRoutes({
        invitations,
        generateRoute,
      });
    } else if (organizations.length === 0) {
      routes = generateOnboardingOrganizationRoutes({
        hasCompletedOrganizationOnboarding,
        generateRoute,
      });
    } else {
      routes = generateAuthenticatedRoutes({
        generateRoute,
        organizations,
      });
    }
  }

  return (
    <>
      <BrowserRouter>
        <RedirectProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/:lang">
              {routes}
            </Route>
          </Routes>
        </RedirectProvider>
      </BrowserRouter>
      <ModalCreate
        title={title}
        titleIcon={titleIcon}
        isShowingModal={isShowingModal}
        hideModal={hideModal}
        handleChange={handleChange}
        contentText={contentText}
        isLoading={isFormLoading}
        isMobile={isMobile}
        nbFormSubmissionCounter={nbFormSubmissionCounter}
        hasAnError={hasAnError}
        handleSubmit={handleFormAction}
        submitButtonText={submitButtonText}
        formInputs={formInputs}
        fields={fields}
        formInputsErrorsHelpers={formInputsErrorsHelpers}
        t={t}
        handleBack={handleBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
      <ModalEdit
        title={modalTitleEdit}
        titleIcon={modalTitleIconEdit}
        isShowingModal={isShowingModalEdit}
        hideModal={hideModalEdit}
        handleChange={handleChangeEdit}
        contentText={contentTextEdit}
        isLoading={isFormLoadingEdit}
        isMobile={isMobile}
        nbFormSubmissionCounter={nbFormSubmissionCounterEdit}
        hasAnError={hasAnErrorEdit}
        handleSubmit={handleFormActionEdit}
        formInputs={formInputsEdit}
        fields={fieldsEdit}
        formInputsErrorsHelpers={formInputsErrorsHelpersEdit}
        t={t}
      />
      <ModalConfirmation
        title={titleConfirmation}
        titleIcon={titleIconConfirmation}
        isShowingModal={isShowingModalConfirmation}
        hideModal={hideModalConfirmation}
        setConfirmationProvidedText={setConfirmationProvidedText}
        confirmationProvidedText={confirmationProvidedText}
        confirmationText={confirmationText}
        isLoading={isFormLoadingConfirmation}
        nbFormSubmissionCounter={nbFormSubmissionCounterConfirmation}
        hasAnError={hasAnErrorConfirmation}
        handleSubmit={handleFormActionConfirmation}
        submitButtonText={submitButtonTextConfirmation}
        isMobile={isMobile}
        t={t}
        type={type}
        confirmationProvidedTextErrorHelper={confirmationProvidedTextErrorHelper}
        confirmationLabel={confirmationLabel}
        contentText={contentTextConfirmation}
      />
    </>
  );
};

const App = () => (
  <ProvidersHoc>
    <AuthUserProvider>
      <AuthAwareApp />
    </AuthUserProvider>
  </ProvidersHoc>
);

//  <BrowserRouter>
//   <Routes>
//     <Route path=":lang">
//       <Route index element={<Home />} />
//       <Route path="about" element={<About />} />

//       <Route element={<AuthLayout />}>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>

//       <Route path="concerts">
//         <Route index element={<ConcertsHome />} />
//         <Route path=":city" element={<City />} />
//         <Route path="trending" element={<Trending />} />
//       </Route>

//       <Route path="login-link">
//         <Route index element={<LoginLinkRequestPage />} />
//         <Route path="sent" element={<LoginLinkSentPage />} />
//         <Route path="verify" element={<LoginLinkVerifyPage />} />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Route>
//     <Route path="*" element={<NotFound />} />
//   </Routes>
// </BrowserRouter>

export default App
