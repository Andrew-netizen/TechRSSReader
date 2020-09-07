import { BlogState } from '../blog/state/blog.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  blog: BlogState;
}
