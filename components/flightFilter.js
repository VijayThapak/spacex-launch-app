function FlightFilter({ spaceXFilters, appliedFilters, handleNavigation }) {
    const isActive = (value, groupId) => {
        let active = false;
        switch(groupId) {
            case 0: active = appliedFilters['launch_year'] === value; break;
            case 1: active = appliedFilters['launch_success'] === value.toString(); break;
            case 2: active = appliedFilters['land_success'] === value.toString(); break;
        }
        return active;
    }
    const generateFiltersDom = () => {
        return spaceXFilters.map((obj, index) => {
            let caption = <p className="filters-caption">{obj.caption}</p>;
            let filtersDom = obj.filters.map((filter, currentIndex) => {
                let btn = <button className={isActive(filter.value, index) ? 'btn btn-success filter-btn active' : 'btn btn-success filter-btn'} onClick={handleNavigation.bind(null, filter.filterStr)} value={filter.value}>{filter.label}</button>
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