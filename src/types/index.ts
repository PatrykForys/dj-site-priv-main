export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  message?: string;
  created_at: Date;
}

export interface AnalyticsSession {
  id: number;
  device_type: string;
  created_at: Date;
}

export interface AnalyticsPageview {
  id: number;
  session_id: number;
  page_url: string;
  time_on_page: number;
  timestamp: Date;
}

export interface AnalyticsData {
  totalPageviews: number;
  todayVisits: number;
  weeklyVisits: number;
  monthlyVisits: number;
  averageTimeOnPage: number;
  deviceTypes: Array<{
    type: string;
    count: number;
  }>;
}

export type EventType = 'wesele' | 'urodziny' | 'osiemnastka' | 'event_firmowy' | 'inne'; 