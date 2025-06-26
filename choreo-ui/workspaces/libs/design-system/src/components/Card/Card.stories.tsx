import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import type { CardProps } from './Card';
import { Box, Grid, Typography } from '@mui/material';
// import { CardHeading } from './SubComponents/CardHeading';
import { CardContent } from './SubComponents/CardContent';
// import { CardActions } from './SubComponents/CardActions';
import { CardActionArea } from './SubComponents/CardActionArea';
import { Button, ButtonContainer } from '@design-system/components';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', p: 2.5 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// const DemoContent = (props: { text: string }) => {
//   return (
//     <CardContent testId="default-card-content">
//       <Typography>{props.text}</Typography>
//     </CardContent>
//   );
// };

// export const Default: Story = {
//   args: {
//     children: (
//       <>
//         <CardHeading testId="default-card-heading" title="Card Title" />
//         <CardContent testId="default-card-content">Default Card</CardContent>
//         <CardActions testId="default-card-actions">
//           <Button
//             variant="contained"
//             color="secondary"
//             testId="btn-action-secondary"
//           >
//             Action
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             testId="btn-action-primary"
//           >
//             Action
//           </Button>
//         </CardActions>
//       </>
//     ),
//     testId: 'default-card',
//   },
// };

// export const WithBorderRadius: Story = {
//   args: {
//     children: <DemoContent text="Card with Different Border Radius" />,
//     testId: 'border-radius-card',
//     borderRadius: 'lg',
//   },
// };

// export const WithBoxShadow: Story = {
//   args: {
//     children: <DemoContent text="Card with Dark Shadow" />,
//     testId: 'shadow-card',
//     boxShadow: 'dark',
//   },
// };

// export const SecondaryBackground: Story = {
//   args: {
//     children: <DemoContent text="Card with Secondary Background" />,
//     testId: 'secondary-bg-card',
//     bgColor: 'secondary',
//   },
// };

// export const DisabledCard: Story = {
//   args: {
//     children: <DemoContent text="Disabled Card" />,
//     testId: 'disabled-card',
//     disabled: true,
//   },
// };

// export const FullHeight: Story = {
//   args: {
//     children: <DemoContent text="Full Height Card" />,
//     testId: 'full-height-card',
//     fullHeight: true,
//   },
//   decorators: [
//     (Story) => (
//       <Box sx={{ width: '300px', height: '400px', p: 2.5 }}>
//         <Story />
//       </Box>
//     ),
//   ],
// };

// export const OutlinedVariant: Story = {
//   args: {
//     children: <DemoContent text="Outlined Card" />,
//     testId: 'outlined-card',
//     variant: 'outlined',
//   },
// };

// export const WithSubComponents: Story = {
//   args: {
//     testId: 'card-with-subcomponents',
//     children: (
//       <>
//         <CardHeading
//           title="Card Title"
//           onClose={() => console.log('close clicked')}
//           testId="card-heading"
//         />
//         <CardContent testId="card-content" paddingSize="lg">
//           <Typography>
//             This is an example of a card with all subcomponents including
//             heading, content, and actions.
//           </Typography>
//         </CardContent>
//         <CardActions testId="card-actions">
//           <Button variant="contained" color="primary" testId="btn-action">
//             Action
//           </Button>
//         </CardActions>
//       </>
//     ),
//   },
// };

// export const ClickableCard: Story = {
//   args: {
//     testId: 'clickable-card',
//     children: (
//       <CardActionArea
//         testId="card-action-area"
//         onClick={() => console.log('card clicked')}
//       >
//         <CardContent testId="card-content" paddingSize="md">
//           <Typography variant="h6">Clickable Card</Typography>
//           <Typography>
//             Click anywhere on this card to trigger an action
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     ),
//   },
// };

// export const OutlinedClickableCard: Story = {
//   args: {
//     testId: 'outlined-clickable-card',
//     variant: 'outlined',
//     children: (
//       <CardActionArea
//         testId="card-action-area"
//         variant="outlined"
//         onClick={() => console.log('card clicked')}
//       >
//         <CardContent testId="card-content" paddingSize="md">
//           <Typography variant="h6">Outlined Clickable Card</Typography>
//           <Typography>An outlined variant of the clickable card</Typography>
//         </CardContent>
//       </CardActionArea>
//     ),
//   },
// };

export const BgGrey: Story = {
  args: {
    testId: 'card',
  },
  render: (args) => {
    return (
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Card boxShadow="dark" {...args} testId={`${args.testId}-1`}>
              <CardActionArea testId={`${args.testId}-1`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <ButtonContainer testId="story-3" align="left" marginTop="md">
                    <Button testId="share" size="small" color="primary">
                      Share
                    </Button>
                    <Button testId="learn-more" size="small" color="primary">
                      Learn More
                    </Button>
                  </ButtonContainer>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Card boxShadow="dark" {...args} testId={`${args.testId}-2`}>
              <CardActionArea testId={`${args.testId}-2`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <ButtonContainer testId="story-3" align="left" marginTop="md">
                    <Button testId="share" size="small" color="primary">
                      Share
                    </Button>
                    <Button testId="learn-more" size="small" color="primary">
                      Learn More
                    </Button>
                  </ButtonContainer>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <Card
              disabled
              boxShadow="dark"
              {...args}
              testId={`${args.testId}-3`}
            >
              <CardActionArea disabled testId={`${args.testId}-3`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <ButtonContainer testId="story-3" align="left" marginTop="md">
                    <Button testId="share" size="small" color="primary">
                      Share
                    </Button>
                    <Button testId="learn-more" size="small" color="primary">
                      Learn More
                    </Button>
                  </ButtonContainer>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  },
};

export const BgWhite: Story = {
  args: {
    testId: 'card',
  },
  render: (args) => {
    return (
      <Card testId="template-card-white">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card boxShadow="light" {...args} testId={`${args.testId}-4`}>
                <CardActionArea testId={`${args.testId}-4`}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                    <ButtonContainer
                      testId="story-3"
                      align="left"
                      marginTop="md"
                    >
                      <Button testId="share" size="small" color="primary">
                        Share
                      </Button>
                      <Button testId="learn-more" size="small" color="primary">
                        Learn More
                      </Button>
                    </ButtonContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card boxShadow="light" {...args} testId={`${args.testId}-5`}>
                <CardActionArea testId={`${args.testId}-5`}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                    <ButtonContainer
                      testId="story-3"
                      align="left"
                      marginTop="md"
                    >
                      <Button testId="share" size="small" color="primary">
                        Share
                      </Button>
                      <Button testId="learn-more" size="small" color="primary">
                        Learn More
                      </Button>
                    </ButtonContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                disabled
                boxShadow="light"
                {...args}
                testId={`${args.testId}-6`}
              >
                <CardActionArea disabled testId={`${args.testId}-6`}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                    <ButtonContainer
                      testId="story-3"
                      align="left"
                      marginTop="md"
                    >
                      <Button testId="share" size="small" color="primary">
                        Share
                      </Button>
                      <Button testId="learn-more" size="small" color="primary">
                        Learn More
                      </Button>
                    </ButtonContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  },
};

export const Record: Story = {
  args: {
    testId: 'card',
  },
  render: (args) => {
    return (
      <Card testId="template-record-card">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card {...args} variant="outlined" testId={`${args.testId}-7`}>
                <CardActionArea variant="outlined" testId={`${args.testId}-7`}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                    <ButtonContainer
                      testId="story-3"
                      align="left"
                      marginTop="md"
                    >
                      <Button testId="share" size="small" color="primary">
                        Share
                      </Button>
                      <Button testId="learn-more" size="small" color="primary">
                        Learn More
                      </Button>
                    </ButtonContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card {...args} variant="outlined" testId={`${args.testId}-8`}>
                <CardActionArea variant="outlined" testId={`${args.testId}-8`}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                    <ButtonContainer
                      testId="story-3"
                      align="left"
                      marginTop="md"
                    >
                      <Button testId="share" size="small" color="primary">
                        Share
                      </Button>
                      <Button testId="learn-more" size="small" color="primary">
                        Learn More
                      </Button>
                    </ButtonContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                disabled
                {...args}
                variant="outlined"
                testId={`${args.testId}-9`}
              >
                <CardActionArea
                  disabled
                  variant="outlined"
                  testId={`${args.testId}-9`}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                    <ButtonContainer
                      testId="story-3"
                      align="left"
                      marginTop="md"
                    >
                      <Button testId="share" size="small" color="primary">
                        Share
                      </Button>
                      <Button testId="learn-more" size="small" color="primary">
                        Learn More
                      </Button>
                    </ButtonContainer>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  },
};

export const GreyCard: Story = {
  args: {
    testId: 'card',
  },
  render: (args) => {
    return (
      <Card testId="template-grey-card">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                {...args}
                boxShadow="none"
                bgColor="secondary"
                testId={`${args.testId}-10`}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <ButtonContainer testId="story-3" align="left" marginTop="md">
                    <Button testId="share" size="small" color="primary">
                      Share
                    </Button>
                    <Button testId="learn-more" size="small" color="primary">
                      Learn More
                    </Button>
                  </ButtonContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                {...args}
                boxShadow="none"
                bgColor="secondary"
                testId={`${args.testId}-11`}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <ButtonContainer testId="story-3" align="left" marginTop="md">
                    <Button testId="share" size="small" color="primary">
                      Share
                    </Button>
                    <Button testId="learn-more" size="small" color="primary">
                      Learn More
                    </Button>
                  </ButtonContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                {...args}
                boxShadow="none"
                bgColor="secondary"
                testId={`${args.testId}-12`}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                  <ButtonContainer testId="story-3" align="left" marginTop="md">
                    <Button testId="share" size="small" color="primary">
                      Share
                    </Button>
                    <Button testId="learn-more" size="small" color="primary">
                      Learn More
                    </Button>
                  </ButtonContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  },
};

export const FullHeightCard: Story = {
  args: {
    testId: 'card',
  },
  render: (args) => {
    return (
      <Card testId="template-grey-card">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                {...args}
                boxShadow="none"
                bgColor="secondary"
                testId={`${args.testId}-13`}
                fullHeight
              >
                <CardActionArea fullHeight testId={`${args.testId}-13`}>
                  <CardContent fullHeight>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                {...args}
                boxShadow="none"
                bgColor="secondary"
                testId={`${args.testId}-14`}
                fullHeight
              >
                <CardActionArea fullHeight testId={`${args.testId}-14`}>
                  <CardContent fullHeight>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card
                {...args}
                boxShadow="none"
                bgColor="secondary"
                testId={`${args.testId}-15`}
                fullHeight
              >
                <CardActionArea fullHeight testId={`${args.testId}-15`}>
                  <CardContent fullHeight>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="secondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica widespread group of squamate reptiles, with
                      over
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  },
};

export const SimpleCard: Story = {
  args: {
    testId: 'card',
  },
  render: (args) => {
    return (
      <Card testId="template-grey-card">
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card {...args} testId={`${args.testId}-16`} fullHeight>
                <CardContent fullHeight>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card {...args} testId={`${args.testId}-17`} fullHeight>
                <CardContent fullHeight>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Card {...args} testId={`${args.testId}-18`} fullHeight>
                <CardContent fullHeight paddingSize="md">
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard (md)
                  </Typography>
                  <Typography variant="body2" color="secondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica widespread group of squamate reptiles, with over
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  },
};
