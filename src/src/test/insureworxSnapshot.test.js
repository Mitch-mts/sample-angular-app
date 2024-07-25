import renderer from 'react-test-renderer';
import Link from '../Link';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://localhost:4200/">InsureworX</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});