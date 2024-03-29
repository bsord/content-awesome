import AddContentOutline from './AddContentOutline';
import ContentOutlinesList from './ContentOutlinesList';
import { Typography } from '../../../components/Elements';

export const ContentOutlinesView = () => {
  return (
    <div className="max-w-md">
      <div className="mt-6 flex flex-col items-center">
        <Typography variant="h3">Outline</Typography>

        
        <ContentOutlinesList />
      </div>
    </div>
  );
};
