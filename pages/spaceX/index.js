import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import Flight from '../../components/flight';
import FlightFilter from '../../components/flightFilter';

const BASE_URL = 'https://api.spaceXdata.com/v3/launches?limit=100';

export default function Home({ data }) {
  const router = useRouter();
  const [appliedFilters, updateAppliedFilters] = useState({
    launch_year: null,
    launch_success: null,
    land_success: null
  });
  const [flightData, updateFlightData] = useState(data);

  useEffect(() => {
    if (window.location.search) {
      handleNavigation(window.location.search.slice(0, 1));
    }
    return () => {
      console.log(location);
    }
  }, [])

  const spaceXFilters = [{
    caption: 'Launch Year',
    filters: [{
      label: '2006',
      value: '2006',
      filterStr: 'launch_year=2006'
    },
    {
      label: '2007',
      value: '2007',
      filterStr: 'launch_year=2007'
    },
    {
      label: '2008',
      value: '2008',
      filterStr: 'launch_year=2008'
    },
    {
      label: '2009',
      value: '2009',
      filterStr: 'launch_year=2009'
    },
    {
      label: '2010',
      value: '2010',
      filterStr: 'launch_year=2010'
    },
    {
      label: '2011',
      value: '2011',
      filterStr: 'launch_year=2011'
    },
    {
      label: '2012',
      value: '2012',
      filterStr: 'launch_year=2012'
    },
    {
      label: '2013',
      value: '2013',
      filterStr: 'launch_year=2013'
    },
    {
      label: '2014',
      value: '2014',
      filterStr: 'launch_year=2014'
    },
    {
      label: '2015',
      value: '2015',
      filterStr: 'launch_year=2015'
    },
    {
      label: '2016',
      value: '2016',
      filterStr: 'launch_year=2016'
    }, ,
    {
      label: '2017',
      value: '2017',
      filterStr: 'launch_year=2017'
    },
    {
      label: '2018',
      value: '2018',
      filterStr: 'launch_year=2018'
    },
    {
      label: '2019',
      value: '2019',
      filterStr: 'launch_year=2019'
    },
    {
      label: '2020',
      value: '2020',
      filterStr: 'launch_year=2020'
    }]
  },
  {
    caption: 'Successful Year',
    filters: [{
      label: 'True',
      value: true,
      filterStr: `launch_success=${true}`
    },
    {
      label: 'False',
      value: false,
      filterStr: `launch_success=${false}`
    }]
  },
  {
    caption: 'Successful Landing',
    filters: [{
      label: 'True',
      value: true,
      filterStr: `land_success=${true}`
    },
    {
      label: 'False',
      value: false,
      filterStr: `land_success=${false}`
    }]
  }];

  /**
   * updates url without refreshing page
   *
   * @param {*} filterStr
   */
  const handleNavigation = (filterStr) => {
    const filters = { ...appliedFilters };
    const [filterName, filterValue] = filterStr.split('=');
    filters[filterName] = filterValue;
    let params = '';
    for (let key in filters) {
      if (filters[key]) {
        params += `${key}=${filters[key]}&`
      }
    }
    params = params.slice(0, -1);
    updateAppliedFilters(filters);
    const currentUrl = window.location.pathname + `?${params}`;
    router.push(currentUrl, undefined, { shallow: true });
    fetchData(params);
  }

  /**
 * fetch data from server at client
 *
 * @export
 * @param {*} props
 * @returns
 */
  const fetchData = async (params) => {
    const res = await fetch(`${BASE_URL}` + `&${params}`);
    const flightRes = await res.json();
    updateFlightData(flightRes);
  }

  return (
    <div>
      <Head>
        <title>SpaceX Launch App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-sm-12 col-lg-2">
                <div className="col-12 filters-container">
                  <p className="h5">Filters</p>
                  <FlightFilter spaceXFilters={spaceXFilters} handleNavigation={handleNavigation}></FlightFilter>
                </div>
              </div>
              <div className="col-sm-12 col-lg-10">
                <div className="row">
                  {
                    flightData.map((flight, index) => {
                      return <Flight flightData={flight} key={'randomKey' + index}></Flight>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <footer className="footer text-center w-100">
        Developed by: Vijay Thapak
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('https://api.spacexdata.com/v3/launches?limit=100');
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}