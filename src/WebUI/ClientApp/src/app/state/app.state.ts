
import { ArticlesState } from '../articles/state/articles.reducer';
import { BlogState } from '../blog/state/blog.reducer';
import { TrainingState } from '../training/state/training.reducer';

// Representation of the entire app state
export interface State {
  articles: ArticlesState;
  blogs: BlogState;
  training: TrainingState;
}
