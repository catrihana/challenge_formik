import { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '@src/lib/interfaces/IPerson';

export default (req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void => {
    const {
        query: { id }
    } = req;
    
    if (typeof id === 'string') {
        console.log(`getting person by id: ${id}`);
        res.status(200).json({
          userId: 1,
          id: 1,
          title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        });
    } else {
        res.status(500).json(new Error('id is not of correct type'));
    }
    
};
