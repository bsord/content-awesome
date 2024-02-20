import AddContentTeaser from './AddContentTeaser';
import ContentTeasersList from './ContentTeasersList';
import { Typography } from '../../../components/Elements';

export const ContentTeasersView = () => {
  return (
    <div className="max-w-md">
      <div className="mt-6 flex flex-col items-center">
        <Typography variant="h3">Content Teasers</Typography>

        
        <ContentTeasersList />
      </div>
    </div>
  );
};
