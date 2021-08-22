import { render, screen } from '@testing-library/react';
import Compare from './Compare';
import { BrowserRouter } from 'react-router-dom';
const testData = [
  {
    mission_name: 'Starlink-14 (v1.0)',
    id: '105',
    launch_date_local: '2020-10-24T11:31:00-04:00',
    launch_site: {
      site_name_long:
        'Cape Canaveral Air Force Station Space Launch Complex 40',
    },
    links: {
      article_link:
        'https://spaceflightnow.com/2020/10/24/spacex-adds-another-60-satellites-to-starlink-network/',
      video_link: 'https://youtu.be/2gbVgTxLgN0',
    },
    rocket: {
      rocket_name: 'Falcon 9',
      first_stage: {
        cores: [
          {
            flight: 3,
            core: { reuse_count: 2, status: 'unknown' },
          },
        ],
      },
      second_stage: {
        payloads: [
          {
            payload_type: 'Satellite',
            payload_mass_kg: 15400,
            payload_mass_lbs: 500,
          },
        ],
      },
    },
  },
  {
    mission_name: 'Starlink-13 (v1.0)',
    id: '104',
    launch_date_local: '2020-10-18T08:25:00-04:00',
    launch_site: {
      site_name_long: 'Kennedy Space Center Historic Launch Complex 39A',
    },
    links: {
      article_link:
        'https://spaceflightnow.com/2020/10/18/spacex-launches-another-batch-of-starlink-satellites/',
      video_link: 'https://youtu.be/UM8CDDAmp98',
    },
    rocket: {
      rocket_name: 'Falcon 9',
      first_stage: {
        cores: [
          {
            flight: 6,
            core: { reuse_count: 5, status: 'active' },
          },
        ],
      },
      second_stage: {
        payloads: [
          {
            payload_type: 'Satellite',
            payload_mass_kg: 15400,
            payload_mass_lbs: 500,
          },
        ],
      },
    },
  },
];

// test utils file
const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState(
    {
      state: {
        detail: testData,
      },
    },
    'Test page',
    route
  );

  return render(ui, { wrapper: BrowserRouter });
};

test('Render Compare component with test data', () => {
  const route = '/compare';
  renderWithRouter(<Compare />, { route });
  expect(screen.getByText('Starlink-14 (v1.0)')).toBeInTheDocument();
});
