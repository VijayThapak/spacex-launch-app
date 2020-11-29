function FlightFilter({ spaceXFilters, handleNavigation }) {
    const generateFiltersDom = () => {
        return spaceXFilters.map((obj, index) => {
            let caption = <p className="filters-caption">{obj.caption}</p>;
            let filtersDom = obj.filters.map((filter, currentIndex) => {
                let btn = <button className="btn btn-success filter-btn" onClick={handleNavigation.bind(null, filter.filterStr)} value={filter.value}>{filter.label}</button>
                return (
                    <div key={'randomChildId' + currentIndex} className="col-6">
                        {btn}
                    </div>
                )
            });
            return (
                <div key={'randomId' + index}>
                    {caption}
                    <div className="row">
                        {filtersDom}
                    </div>
                </div>
            );
        })
    }

    return (
        <div>
            {generateFiltersDom()}
        </div>
    )
}

export default FlightFilter;