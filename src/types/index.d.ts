// Tipos para la API de La Manija Official

export interface Author {
  id: number
  name: string
  email: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Section {
  id: number
  name: string
  slug: string
  description?: string
  type: string
  position: number
  show_in_menu: boolean
  created_at: string
  updated_at: string
  posts_count?: number
  posts?: Post[]
}

export interface Post {
  id: number
  section_id: number
  category_id: number
  author_id: number
  title: string
  slug: string
  copyright?: string
  excerpt?: string
  short_note?: string
  content: string
  meta_description?: string
  image?: string
  type_image?: string
  image_type?: string
  video_url?: string
  status: string
  date_published: string
  tags?: string[]
  image_title?: string
  image_alt?: string
  image_copyright?: string
  copyright_image?: string
  visibility?: string
  difficulty?: string
  created_at: string
  updated_at: string
  author?: Author
  category?: Category
  section?: Section
}

export interface Course {
  id: number
  title: string
  description?: string
  created_at: string
  updated_at: string
}

// Query parameters
export interface PostsQuery {
  section_id?: number
  category_id?: number
  author_id?: number
  per_page?: number
  page?: number
}

export interface SectionPostsQuery {
  per_page?: number
  page?: number
}

// API Response wrappers
export interface PostsResponse {
  posts: Post[]
  pagination: {
    current_page: number
    per_page: number
    total: number
    last_page: number
    from: number | null
    to: number | null
  }
}

export interface RelatedPostsResponse {
  original_post: {
    id: number
    title: string
    slug: string
  }
  related_posts: Post[]
}

export interface SectionPostsResponse {
  section: Section
  posts: Post[]
  pagination: {
    current_page: number
    per_page: number
    total: number
    last_page: number
    from: number | null
    to: number | null
  }
}

// Tipos para Eventos
export interface Event {
  id: number
  title: string
  slug: string
  location: string
  start_date: string
  end_date?: string
  address: string
  short_description?: string
  description: string
  image?: string
  image_alt?: string
  gallery?: string[]
  ticket_url?: string
  status: 'draft' | 'published' | 'cancelled'
  featured: boolean
  section_id?: number
  created_at: string
  updated_at: string
  formatted_date: string
  is_upcoming: boolean
  has_tickets: boolean
  min_price?: number
  section?: Section
  tickets?: EventTicket[]
  active_tickets?: EventTicket[]
}

export interface EventTicket {
  id: number
  event_id: number
  name: string
  price: number
  quantity?: number
  sold: number
  is_active: boolean
  available: number
  is_sold_out: boolean
  created_at: string
  updated_at: string
}

// Tipos para DJ Profiles
export interface DJProfile {
  id: number
  name: string
  slug: string
  bio?: string
  image?: string
  genre?: string
  city?: string
  country?: string
  years_active?: string
  record_label?: string
  instagram_url?: string
  spotify_url?: string
  soundcloud_url?: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  position: number
  created_at: string
  updated_at: string
  active_tracks?: Track[]
  upcoming_events?: DJEvent[]
}

export interface DJEvent extends Event {
  pivot?: {
    set_time?: string
    set_duration?: string
    stage?: string
    role?: string
    position?: number
  }
}

export interface Track {
  id: number
  dj_profile_id: number
  title: string
  artist?: string
  genre?: string
  duration?: string
  cover_image?: string
  audio_url?: string
  audio_file?: string
  platform: 'soundcloud' | 'spotify' | 'youtube' | 'upload' | 'other'
  external_url?: string
  is_active: boolean
  position: number
  created_at: string
  updated_at: string
}

// Respuestas de la API para eventos
export interface EventsResponse {
  data: Event[]
  current_page: number
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}