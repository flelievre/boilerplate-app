/*
  Created by François LELIEVRE ©
*/

/* [+] Community imports */
import React from 'react';

/* [+] MaterialUI imports */
import {
  Grid,
  CssBaseline,
  Box,
  Paper,
} from '@mui/material';

const PageWithImage = ({
  children = <></>,
  content = <></>,
  imagePosition = 'left',
  isMobile = false,
  imageSrc = '',
}) => (
  <Grid
    container
    component="main"
    sx={{
      height: '100dvh',
    }}
  >
    <CssBaseline />
    {imagePosition === 'left' && (
      <Grid
        size={{
          xs: 0,
          sm: 4,
          md: 7,
        }}
        sx={[
          {
            backgroundImage: `url(${imageSrc})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          },
        ]}
      >
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex',
            },
            p: 10,
            height: '75dvh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {content}
        </Box>
      </Grid>
    )}
    <Grid
      size={{
        xs: 12,
        sm: 8,
        md: 5,
      }}
      component={Paper}
      elevation={1}
      square
    >
      <Box
        sx={{
          mx: 4,
          pt: isMobile
            ? 7.5
            : 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Grid>
    {imagePosition === 'right' && (
      <Grid
        size={{
          xs: 0,
          sm: 4,
          md: 7,
        }}
        sx={{
          backgroundImage: `url(${imageSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Paper
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}
        >
          {content}
        </Paper>
      </Grid>
    )}
  </Grid>
);

export default PageWithImage;
