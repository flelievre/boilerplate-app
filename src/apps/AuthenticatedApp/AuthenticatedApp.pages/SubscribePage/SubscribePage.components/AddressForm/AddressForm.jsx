import {
  useAddressForm,
} from './AddressForm.logic';
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  Switch,
  TextField,
  Autocomplete,
} from '@mui/material';
import {
  COUNTRIES,
} from '@/constants';
import {
  snakeCaseToUpperText,
  SubmitButton,
} from '@/utils';
import {
  Icon as IconifyIcon,
} from '@iconify/react';

const AddressForm = ({
  updateSubscriptionFunnel = () => {},
  stripePriceId = '',
}) => {
  const {
    t,
    isMobile,
    isCompany,
    toggleIsCompany,
    legalName,
    setLegalName,
    legalNameErrorHelper,
    addressLine1,
    setAddressLine1,
    addressLine1ErrorHelper,
    addressLine2,
    setAddressLine2,
    city,
    setCity,
    cityErrorHelper,
    postalCode,
    setPostalCode,
    postalCodeErrorHelper,
    state,
    setState,
    country,
    setCountry,
    countryNameInput,
    setCountryNameInput,
    countryNameErrorHelper,
    countryHasATaxOption,
    countryTaxOptions,
    tax,
    setTax,
    taxNameInput,
    setTaxNameInput,
    taxCodeErrorHelper,
    taxNumber,
    setTaxNumber,
    taxNumberErrorHelper,
    taxNumberErrorFromBackendHelper,
    hasAnError,
    nbFormSubmissionCounter,
    isAddressFormLoading,
    handleAddressFormSubmission,
    goBack,
  } = useAddressForm({
    updateSubscriptionFunnel,
    stripePriceId,
  });

  return (
    <Container
      id="billing-address"
      maxWidth="md"
      sx={{
        pt: {
          xs: 8,
          sm: 12,
        },
        pb: {
          xs: 8,
          sm: 16,
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: {
          xs: 1,
        },
      }}
    >
      <Typography
        component="h1"
        variant=""
      >
        {t('Billing address')}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="primary.dark"
      >
        {t('Choose “Individual“ or “Company“ accordingly')}
      </Typography>
      <Grid
        container
        justifyContent="center"
        spacing={(
          isMobile
            ? 1.5
            : 3
        )}
      >
        <Grid size={12} textAlign="left">
          <Button
            variant="outlined"
            size={(
              isMobile
                ? 'small'
                : 'medium'
            )}
            startIcon={(
              <IconifyIcon
                icon="mingcute:arrow-left-fill"
              />
            )}
            onClick={goBack}
          >
            {t('Back')}
          </Button>
        </Grid>
        <Grid size={12}>
          <Typography
            component="span"
            color={(
              isCompany
                ? 'inherit'
                : 'primary.main'
            )}
            sx={{
              opacity: isCompany
                ? 0.5
                : 1,
              fontWeight: isCompany
                ? 500
                : 600,
              fontSize: '1.2em',
            }}
          >
            {t('Individual')}
          </Typography>
          <Switch
            checked={isCompany}
            onChange={toggleIsCompany}
            sx={{
              '& .MuiSwitch-switchBase': {
                color: 'primary.light', // Thumb color when unchecked
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)', // Slight hover effect for better UX
                },
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'primary.light', // Thumb color when checked
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)', // Hover effect
                },
              },
              '& .MuiSwitch-track': {
                backgroundColor: 'primary.dark', // Track color (always secondary)
                opacity: 1, // Make it solid
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'primary.dark', // Track color when checked
                opacity: 1,
              },
            }}
          />
          <Typography
            component="span"
            color={(
              isCompany
                ? 'primary.main'
                : 'inherit'
            )}
            sx={{
              fontSize: '1.2em',
              opacity: isCompany
                ? 1
                : 0.5,
              fontWeight: isCompany
                ? 600
                : 400,
            }}
          >
            {t('Company')}
          </Typography>
        </Grid>
        {isCompany && (
          <Grid
            size={12}
          >
            <TextField
              name="legalName"
              required
              fullWidth
              id="legalName"
              label={t('Legal company name')}
              autoFocus={!isMobile && isCompany}
              value={legalName}
              onChange={({ target }) => setLegalName(target.value)}
              variant="outlined"
              error={!!legalNameErrorHelper}
              helperText={legalNameErrorHelper}
            />
          </Grid>
        )}
        <Grid
          size={12}
        >
          <TextField
            required
            fullWidth
            id="addressLine1"
            label={t('Address - Line 1')}
            autoFocus={!isMobile && !isCompany}
            name="addressLine1"
            value={addressLine1}
            onChange={({ target }) => setAddressLine1(target.value)}
            variant="outlined"
            error={!!addressLine1ErrorHelper}
            helperText={addressLine1ErrorHelper}
          />
        </Grid>
        <Grid
          size={12}
        >
          <TextField
            fullWidth
            id="addressLine2"
            label={t('Address - Line 2')}
            name="addressLine2"
            value={addressLine2}
            onChange={({ target }) => setAddressLine2(target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 6,
          }}
        >
          <TextField
            name="city"
            required
            fullWidth
            id="city"
            label={t('City')}
            value={city}
            onChange={({ target }) => setCity(target.value)}
            variant="outlined"
            error={!!cityErrorHelper}
            helperText={cityErrorHelper}
          />
        </Grid>
        <Grid 
          size={{
            xs: 12,
            sm: 6,
            md: 6,
          }}
        >
          <TextField
            name="postalCode"
            required
            fullWidth
            id="postalCode"
            label={t('Postal code')}
            value={postalCode}
            onChange={({ target }) => setPostalCode(target.value)}
            variant="outlined"
            error={!!postalCodeErrorHelper}
            helperText={postalCodeErrorHelper}
          />
        </Grid>
        <Grid 
          size={{
            xs: 12,
            sm: 6,
            md: 6,
          }}
        >
          <TextField
            name="state"
            fullWidth
            id="state"
            label={t('State')}
            value={state}
            onChange={({ target }) => setState(target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid 
          size={{
            xs: 12,
            sm: 6,
            md: 6,
          }}
        >
          <Autocomplete
            options={COUNTRIES}
            inputValue={countryNameInput}
            value={country}
            t={t}
            onChange={(event, newValue) => setCountry(newValue)}
            onInputChange={(event, newInputValue) => setCountryNameInput(newInputValue)}
            getOptionLabel={((option) => (
              option
                ? t(option.name)
                : ''
            ))}
            // eslint-disable-next-line
            generateStartAdornment={() => (
              country
                ? (
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                    alt={`${country.name} flag`}
                  />
                ) : (
                  null
                )
            )}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line
                {...params}
                label={t('Country')}
                required
                error={!!countryNameErrorHelper}
                helperText={countryNameErrorHelper}
                InputProps={{
                  ...params.InputProps,
                  // eslint-disable-next-line
                  startAdornment: (
                    country
                      ? (
                        <img
                          loading="lazy"
                          width="20"
                          style={{ marginRight: 5, marginLeft: 5 }}
                          srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                          src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                          alt={`${country.name} flag`}
                        />
                      ) : (
                        null
                      )
                  ),
                }}
              />
            )}
            renderOption={(props, option) => (
              // eslint-disable-next-line
              <Box component="li" {...props} key={option.code}>
                <img
                  loading="lazy"
                  width="20"
                  style={{ marginRight: 10 }}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {t(option.name)}
              </Box>
            )}
          />
          {/* <FormControl fullWidth>
            <InputLabel id="country-select-label">{t('Country')}</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={countryName}
              label={t('Country')}
              sx={{
                textAlign: 'left',
              }}
              onChange={({ target }) => handleCountryNameSelection(target.value)}
            >
              {COUNTRIES.map(({
                code = '',
                name = '',
              }) => (
                <MenuItem
                  key={code}
                  value={name}
                >
                  {t(name)}
                </MenuItem>
              ))}
            </Select>
            {countryNameErrorHelper && (
              <FormHelperText>
                {t(countryNameErrorHelper)}
              </FormHelperText>
            )}
          </FormControl> */}
        </Grid>
        {isCompany && country?.name && countryHasATaxOption && (
          <>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 6,
              }}
            >
              <Autocomplete
                options={countryTaxOptions}
                inputValue={taxNameInput}
                value={tax}
                key={country.code}
                t={t}
                onChange={(event, newValue) => setTax(newValue)}
                onInputChange={(event, newInputValue) => setTaxNameInput(newInputValue)}
                getOptionLabel={((option) => (
                  option
                    ? `${snakeCaseToUpperText(option.code)} - ${option.countryName}`
                    : ''
                ))}
                // eslint-disable-next-line
                generateStartAdornment={() => (
                  tax
                    ? (
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${tax.countryCode.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${tax.countryCode.toLowerCase()}.png`}
                        alt={`${tax.countryName} flag`}
                      />
                    ) : (
                      null
                    )
                )}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line
                    {...params}
                    label={t('Tax')}
                    required
                    error={!!taxCodeErrorHelper}
                    helperText={!!taxCodeErrorHelper}
                    InputProps={{
                      ...params.InputProps,
                      // eslint-disable-next-line
                      startAdornment: (
                        tax
                          ? (
                            <img
                              loading="lazy"
                              width="20"
                              style={{ marginRight: 5, marginLeft: 5 }}
                              srcSet={`https://flagcdn.com/w40/${tax.countryCode.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${tax.countryCode.toLowerCase()}.png`}
                              alt={`${tax.countryName} flag`}
                            />
                          ) : (
                            null
                          )
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  // eslint-disable-next-line
                  <Box component="li" {...props} key={option.code}>
                    <img
                      loading="lazy"
                      width="20"
                      style={{ marginRight: 10 }}
                      src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
                      alt=""
                    />
                    {snakeCaseToUpperText(option.code)}
                    <Typography
                      variant="caption"
                      sx={{
                        ml: 1,
                      }}
                    >
                      {t(option.countryName)}
                    </Typography>
                  </Box>
                )}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 6,
              }}
            >
              <TextField
                name="taxNumber"
                required
                fullWidth
                id="taxNumber"
                label={t('Tax number')}
                value={taxNumber}
                onChange={({ target }) => setTaxNumber(target.value)}
                variant="outlined"
                error={(
                  !!taxNumberErrorHelper
                  || !!taxNumberErrorFromBackendHelper
                )}
                helperText={(
                  taxNumberErrorHelper
                  || taxNumberErrorFromBackendHelper
                )}
              />
            </Grid>
          </>
        )}
        <Grid
          size={12}
        >
          <SubmitButton
            shouldShowErrorState={hasAnError}
            nbClick={nbFormSubmissionCounter}
            sx={{
              mt: 2,
              mb: 2,
            }}
            onClick={handleAddressFormSubmission}
            defaultContent={t('Validate billing address')}
            errorContent={t('Error')}
            defaultColor="primary"
            successColor="success"
            errorColor="error"
            loading={isAddressFormLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddressForm;
