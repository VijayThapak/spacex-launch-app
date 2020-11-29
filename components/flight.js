function Flight({ flightData: flight }) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3">
      <div className="flight text-center">
        <div className="product-image">
          <img src={flight.links.mission_patch_small} alt="image" width="128" height="128" />
        </div>
        <div className="flight-caption h5 flight-text-color">{flight.mission_name}</div>
        <div className="flight-details">
          <div className="row">
            <div className="col-6">
              <p className="h6">Mission Ids:</p>
            </div>
            <div className="col-6 flight-text-color">{flight.mission_id.toString()}</div>
            <div className="col-6">
              <p className="h6">Launch Year:</p>
            </div>
            <div className="col-6 flight-text-color">{flight.launch_year}</div>
            <div className="col-6">
              <p className="h6">Successful Launch:</p>
            </div>
            <div className="col-6 flight-text-color">{flight.launch_success ? 'true' : 'false'}</div>
            <div className="col-6">
              <p className="h6">Successful Landing: {flight.rocket.first_stage.cores[0].land_success}</p>
            </div>
            <div className="col-6 flight-text-color">
              {flight.rocket.first_stage.cores[0].land_success ? 'true' : 'false'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flight;
