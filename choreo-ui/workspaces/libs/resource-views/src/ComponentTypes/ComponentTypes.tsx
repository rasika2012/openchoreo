import {
  Box,
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography,
} from '@open-choreo/design-system';
import * as Images from '@open-choreo/design-system';

export interface ComponentProps {
  type: string;
  webAppType: string;
}

export interface ComponentListProps {
  heading?: string;
  components?: ComponentProps[];
}

// Mapping of programming language names to their corresponding image components
const languageImageMap: Record<string, React.ComponentType<any>> = {
  react: Images.ImageReact,
  nodejs: Images.ImageNode,
  python: Images.ImagePython,
  java: Images.ImageJava,
  go: Images.ImageGo,
  ruby: Images.ImageRuby,
  php: Images.ImagePhp,
  // Add more languages as needed
  // typescript: Images.ImageTypeScript,
  // javascript: Images.ImageJavaScript,
};

function getIcon(webAppType: string) {
  const ImageComponent = languageImageMap[webAppType.toLowerCase()];

  if (ImageComponent) {
    return (
      <Box
        width="20px"
        height="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ImageComponent fontSize="small" />
      </Box>
    );
  }

  // Fallback for unknown languages
  return null;
}

export function ComponentTypes(props: ComponentListProps) {
  const { heading, components = [] } = props;

  // Group by type and webAppType
  const grouped = components.reduce<
    Record<string, { type: string; webAppType: string; count: number }>
  >((acc, comp) => {
    const key = `${comp.type}|${comp.webAppType}`;
    if (!acc[key]) {
      acc[key] = { ...comp, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});

  const rows = Object.values(grouped);
  const total = rows.reduce((sum, row) => sum + row.count, 0);

  return (
    <Card testId="componenttypes">
      <CardContent>
        {heading && <Typography variant="h4">{heading}</Typography>}
        <Box>
          {rows.map((row) => (
            <TableRow key={row.type + row.webAppType} disableHover={true}>
              <TableCell align="left">
                <Typography variant="body1">{row.type}</Typography>
              </TableCell>
              <TableCell align="center">{getIcon(row.webAppType)}</TableCell>
              <TableCell align="right">
                <Typography variant="body1">{row.count}</Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow disableHover={true}>
            <TableCell align="left">
              <Typography variant="h5">Total</Typography>
            </TableCell>
            <TableCell />
            <TableCell align="right">
              <Typography variant="h5">{total}</Typography>
            </TableCell>
          </TableRow>
        </Box>
      </CardContent>
    </Card>
  );
}
