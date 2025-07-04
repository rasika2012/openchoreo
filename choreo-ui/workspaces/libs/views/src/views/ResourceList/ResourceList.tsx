import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  ImageMenuProjectColored,
  Tooltip,
  Typography,
  NoDataMessage,
} from '@open-choreo/design-system';
import { useNavigate } from 'react-router';

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: string;
  lastUpdated: string;
  href?: string;
}

export interface ResourceListProps {
  resources: Resource[];
  footerResourceListCardLeft?: React.ReactNode;
  footerResourceListCardRight?: React.ReactNode;
  cardWidth?: string | number;
}

export function ResourceList(props: ResourceListProps) {
  const { resources, cardWidth = 320 } = props;
  const navigate = useNavigate();

  const handleResourceClick = (resource: Resource) => {
    navigate(resource.href || '');
  };

  return (
    <Box padding={2}>
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        {resources.length > 0 ? (
          resources.map((resource) => (
            <Card
              key={resource.id}
              testId={resource.id}
              boxShadow="dark"
              style={{ width: cardWidth }}
              onClick={() => handleResourceClick(resource)}
            >
              <CardActionArea testId={resource.id}>
                <CardContent paddingSize="md">
                  {/* Card Header with Icon and Text */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={16}
                    margin="0 0 16px 0"
                  >
                    {/* Icon Container - Fixed size */}
                    <Box
                      flexGrow={0}
                      width={48}
                      height={48}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      overflow="visible"
                    >
                      <ImageMenuProjectColored width={48} height={48} />
                    </Box>

                    {/* Text Container */}
                    <Box width="calc(100% - 64px)" overflow="hidden">
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginBottom: '4px',
                        }}
                      >
                        <Typography variant="h6">
                          <Tooltip placement="right" title={resource.name}>
                            {resource.name}
                          </Tooltip>
                        </Typography>
                      </div>
                      <div
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: '1.2em',
                          height: '2.4em',
                        }}
                      >
                        {resource.description ? (
                          <Typography variant="body2">
                            {resource.description}
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No description available.
                          </Typography>
                        )}
                      </div>
                    </Box>
                  </Box>

                  {/* Card Footer */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    color="text.secondary"
                    overflow="hidden"
                    width="100%"
                  >
                    {/* Left Footer Content */}
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '60%',
                      }}
                    >
                      {props.footerResourceListCardLeft}
                    </div>

                    {/* Right Footer Content */}
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      gap={8}
                    >
                      {props.footerResourceListCardRight}
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <NoDataMessage />
        )}
      </div>
    </Box>
  );
}
