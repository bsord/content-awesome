import KeywordsList from './KeywordsList';
import { Typography } from '../../../components/Elements';

export const KeywordsView = () => {
  return (
    <div className="max-w-md">
      <div className="mt-6 flex flex-col items-center">
        <Typography variant="h3">Keywords</Typography>
        
        <KeywordsList />
      </div>
    </div>
  );
};
