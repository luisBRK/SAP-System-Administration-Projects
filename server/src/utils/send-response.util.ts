import { Response } from 'express';
import { serviceInterface } from '../interfaces/system';
import { localizeError } from '../helpers';

interface sendResponseProps {
  res: Response;
  response: serviceInterface<object>;
  locale?: string;
}

export const sendResponse = (props: sendResponseProps) => {
  let { res, response, locale = 'englishResponses' } = props;

  if (response.result) {
    res.status(response.status).json(response.result);
  } else if (response.error) {
    let error = localizeError[locale][response.error];

    res.status(response.status).json({ message: error });
  }
};
