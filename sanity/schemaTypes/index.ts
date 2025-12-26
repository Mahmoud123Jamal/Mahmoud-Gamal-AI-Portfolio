import { type SchemaTypeDefinition } from 'sanity'
import profile from './profile'
import project from './project'
import skill from './skill'
import education from './education'
import service from './service'
import contact from './contact'
import siteSettings from './siteSettings'
import navigation from './navigation'
import footer from './footer'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
profile,
    project,
    skill,
    education,
    service,
    contact,
    siteSettings,
    navigation,
    footer,
  ],
}