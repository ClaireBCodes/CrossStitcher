import { DMC } from './DMC';
import PropTypes from 'prop-types';

function DMCGrid({colours}) {
  return (
    <div>
      {colours.map((colour) => (
        <DMC key={colour.floss} {...colour} />
      ))}
    </div>
  );
}

export { DMCGrid  };

DMCGrid.propTypes = {
  colours: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      floss: PropTypes.string.isRequired,
      hex: PropTypes.string.isRequired,
    })
  ).isRequired,
};