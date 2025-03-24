import PropTypes from 'prop-types';

function DMC({name, floss, hex}) {
  const hexWithHash = `#${hex}`;

  return (
    <div className="dmc" style={{backgroundColor: hexWithHash}}>
      {name} - {floss} - {hexWithHash}
    </div>
  );
}

export { DMC };

DMC.propTypes = {
  name: PropTypes.string.isRequired,
  floss: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
};