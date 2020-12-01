import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import Flight from '../../components/flight';
import FlightFilter from '../../components/flightFilter';

const BASE_URL = 'https://api.spaceXdata.com/v3/launches?limit=100';
const SPACEX_FILTERS = [
  {
    caption: 'Launch Year',
    filters: [
      {
        label: '2006',
        value: '2006',
        filterStr: 'launch_year=2006',
      },
      {
        label: '2007',
        value: '2007',
        filterStr: 'launch_year=2007',
      },
      {
        label: '2008',
        value: '2008',
        filterStr: 'launch_year=2008',
      },
      {
        label: '2009',
        value: '2009',
        filterStr: 'launch_year=2009',
      },
      {
        label: '2010',
        value: '2010',
        filterStr: 'launch_year=2010',
      },
      {
        label: '2011',
        value: '2011',
        filterStr: 'launch_year=2011',
      },
      {
        label: '2012',
        value: '2012',
        filterStr: 'launch_year=2012',
      },
      {
        label: '2013',
        value: '2013',
        filterStr: 'launch_year=2013',
      },
      {
        label: '2014',
        value: '2014',
        filterStr: 'launch_year=2014',
      },
      {
        label: '2015',
        value: '2015',
        filterStr: 'launch_year=2015',
      },
      {
        label: '2016',
        value: '2016',
        filterStr: 'launch_year=2016',
      },
      ,
      {
        label: '2017',
        value: '2017',
        filterStr: 'launch_year=2017',
      },
      {
        label: '2018',
        value: '2018',
        filterStr: 'launch_year=2018',
      },
      {
        label: '2019',
        value: '2019',
        filterStr: 'launch_year=2019',
      },
      {
        label: '2020',
        value: '2020',
        filterStr: 'launch_year=2020',
      },
    ],
  },
  {
    caption: 'Successful Launch',
    filters: [
      {
        label: 'True',
        value: true,
        filterStr: `launch_success=${true}`,
      },
      {
        label: 'False',
        value: false,
        filterStr: `launch_success=${false}`,
      },
    ],
  },
  {
    caption: 'Successful Landing',
    filters: [
      {
        label: 'True',
        value: true,
        filterStr: `land_success=${true}`,
      },
      {
        label: 'False',
        value: false,
        filterStr: `land_success=${false}`,
      },
    ],
  },
];

export default function Home({ data, query }) {
  const router = useRouter();
  const [appliedFilters, setAppliedFilters] = useState({
    launch_year: null,
    launch_success: null,
    land_success: null,
  });
  const [flightData, updateFlightData] = useState(data);
  const spaceXFilters = SPACEX_FILTERS;

  useEffect(() => {
    if (Object.keys(query).length) {
      let queryStr = createQueryStr(query);
      let filters = setFilters(query);

      updateRoute(query);
      setAppliedFilters(filters);
      fetchData(queryStr);
    }
  }, []);

  /**
   * updates url without refreshing page
   *
   * @param {*} filterStr
   */
  const handleNavigation = filterStr => {
    const filters = { ...appliedFilters };
    const [filterName, filterValue] = filterStr.split('=');
    filters[filterName] = filterValue;

    const queryStr = createQueryStr(filters);
    const params = createQueryParams(filters);
    setAppliedFilters(filters);
    updateRoute(params);
    fetchData(queryStr);
  };

  /**
   * creates query params
   *
   * @param {*} filters
   * @returns
   */
  const createQueryParams = filters => {
    let queryParams = {};
    for (let key in filters) {
      if (filters[key]) {
        queryParams[key] = filters[key];
      }
    }
    return queryParams;
  };

  /**
   * create query params string
   *
   * @param {*} filters
   * @returns
   */
  const createQueryStr = filters => {
    let queryStr = '';
    for (let key in filters) {
      if (filters[key]) {
        queryStr += `&${key}=${filters[key]}&`;
      }
    }
    return queryStr.slice(0, -1);
  };

  /**
   * updates browser routes
   *
   * @param {*} params
   */
  const updateRoute = params => {
    router.push(
      {
        pathname: window.location.pathname,
        query: params,
      },
      undefined,
      { shallow: true }
    );
  };

  /**
   * updates filters as par server
   *
   * @param {*} query
   * @returns
   */
  const setFilters = query => {
    let filters = {};
    for (let key in query) {
      if (query[key]) {
        filters[key] = query[key];
      }
    }
    return filters;
  };

  /**
   * fetch data from server at client
   *
   * @export
   * @param {*} props
   * @returns
   */
  const fetchData = async params => {
    const res = await fetch(`${BASE_URL}` + params);
    const flightRes = await res.json();
    updateFlightData(flightRes);
  };

  return (
    <div>
      <Head>
        <title>SpaceX Launch App</title>
        <meta name="description" content="This is a spacex website to show the details of spacex launch."/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-sm-12 col-lg-2">
                <div className="col-12 filters-container">
                  <p className="h5">Filters</p>
                  <FlightFilter
                    spaceXFilters={spaceXFilters}
                    appliedFilters={appliedFilters}
                    handleNavigation={handleNavigation}
                  ></FlightFilter>
                </div>
              </div>
              <div className="col-sm-12 col-lg-10">
                <div className="row">
                  {flightData.map((flight, index) => {
                    return <Flight flightData={flight} key={'randomKey' + index}></Flight>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <footer className="footer text-center w-100">Developed by: Vijay Thapak</footer>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return {
    props: {
      data,
      query: query || {},
    },
  };
}
