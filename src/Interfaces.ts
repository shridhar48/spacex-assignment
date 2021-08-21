interface Cores {
  flight: number;
  core: {
    reuse_count: number;
    status: string;
  };
}

interface Payloads {
  payload_type: string;
  payload_mass_kg: number;
  payload_mass_lbs: number;
}

export interface Launch {
  mission_name: string;
  id: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    article_link: string | null;
    video_link: string;
  };
  rocket: {
    rocket_name: string;
    first_stage: {
      cores: Cores[];
    };
    second_stage: {
      payloads: Payloads[];
    };
  };
}

export interface LaunchesVars {
  limit: number;
  offset: number;
  mission_name: string;
  rocket_name: string;
}

export interface Launches {
  launchesPast: Launch[];
}
