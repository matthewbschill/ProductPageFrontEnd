import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

//Company logos
const whiteLogos = [
    { company: 'Sydney', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg' },
    { company: 'Bern', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg' },
    { company: 'Montreal', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg' },
    { company: 'Terra', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg' },
    { company: 'colorado', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg' },
    { company: 'Ankara', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg' },
];

const darkLogos = [
    { company: 'Sydney', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg' },
    { company: 'Bern', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg' },
    { company: 'Montreal', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg' },
    { company: 'Terra', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg' },
    { company: 'colorado', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg' },
    { company: 'Ankara', link: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg' },
];

const logoStyle = {
    width: '64px',
    opacity: 0.3,
};

//Data Fetching related components
//utilizing a mock json api
const client = new ApolloClient({
    uri: 'https://run.mocky.io/v3/3ef4aae0-5a66-41fb-9f27-27bcc67cf388',
    cache: new InMemoryCache(),
});

const GET_DATA = gql`
      query Testimonials {
        testimonials (first:6) {
          name
          occupation
          testimonial
          company
        }
      }
`;

interface Testimonial {
    name: string;
    occupation: string;
    testimonial: string;
    company: string;
}

interface Data {
    testimonials: Testimonial[];
}

function DataFetchingComponent() {
    const theme = useTheme();
    const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;
    const { loading, error, data } = useQuery<Data>(GET_DATA);

    if (data) {
        console.log(data);
        console.log(data.testimonials);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div>
            <ApolloProvider client={client}>
                <Grid container spacing={2}>
                    {data?.testimonials.map((record, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    flexGrow: 1,
                                    p: 1,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {record?.testimonial}
                                    </Typography>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        pr: 2,
                                    }}
                                >
                                    <CardHeader
                                        avatar=<Avatar>{record.name[0]}</Avatar>
                                        title={record.name}
                                        subheader={record.occupation}
                                    />
                                    <img
                                        src={logos.find(item => item.company === record.company)?.link}
                                        alt={record.company}
                                        style={logoStyle}
                                    />
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </ApolloProvider>
        </div>
    );
};

export default function Testimonials() {

    return (
        <Container
            id="testimonials"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Testimonials
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    See what our customers love about our products. Discover how we excel in
                    efficiency, durability, and satisfaction. Join us for quality, innovation,
                    and reliable support.
                </Typography>
            </Box>
            <div>
                <ApolloProvider client={client}>
                    < DataFetchingComponent />
                </ApolloProvider>
            </div>
        </Container>
    );
}