/**
 * WhatsApp Cloud APILib
 *
 * This file was automatically generated by APIMATIC v3.0 ( https://www.apimatic.io ).
 */

import { array, lazy, object, optional, Schema, string } from '../schema';
import { Component, componentSchema } from './component';
import { Language, languageSchema } from './language';

export interface Template {
  /** Name of the template. */
  name: string;
  language: Language;
  /** Array of components objects containing the parameters of the message. */
  components?: Component[];
}

export const templateSchema: Schema<Template> = object({
  name: ['name', string()],
  language: ['language', lazy(() => languageSchema)],
  components: ['components', optional(array(lazy(() => componentSchema)))],
});
