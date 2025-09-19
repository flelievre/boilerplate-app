import {
  useAddressTab,
} from './AddressTab.logic';
import {
  Typography,
  Paper,
  Box,
  Grid,
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

const AddressTab = () => {
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
  } = useAddressTab();

  return (
    <>
      {/* <Typography
        component="h2"
        color="primary.main"
        sx={{
          mb: 1,
        }}
      >
        {t('Billing address')}
      </Typography> */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >

    <Grid
      container
      spacing={(
        isMobile
          ? 2
          : 3
      )}
    >
      <Grid size={12}>
        <Typography
          component="span"
          sx={{
            opacity: isCompany
              ? 0.5
              : 1,
            fontWeight: isCompany
              ? 500
              : 600,
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
          sx={{
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
          defaultContent={t('Update organization address')}
          errorContent={t('Error')}
          defaultColor="primary"
          successColor="success"
          errorColor="error"
          loading={isAddressFormLoading}
        />
      </Grid>
      </Grid>
      </Paper>
    </>
  );
};

export default AddressTab;
