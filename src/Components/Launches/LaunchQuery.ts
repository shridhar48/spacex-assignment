import gql from 'graphql-tag';

const LAUNCHES_PAST = gql`
  query launchesPast(
    $limit: Int
    $offset: Int
    $mission_name: String
    $rocket_name: String
  ) {
    launchesPast(
      limit: $limit
      offset: $offset
      find: { mission_name: $mission_name, rocket_name: $rocket_name }
    ) {
      mission_name
      id
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
          }
        }
      }
      # ships {
      # name
      # home_port
      #   image
      # }
    }
  }
`;

export { LAUNCHES_PAST };
