import { BlogState } from '../blog/state/blog.reducer';
import { TrainingState } from '../training/state/training.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  blogs: BlogState;
  training: TrainingState;
}
