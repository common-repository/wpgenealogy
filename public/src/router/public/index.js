import Route from '@/views/Route.vue'
import Index from '@/views/Index.vue'
import SurnameRoute from '@/views/Surname/Route.vue'
import SurnameIndex from '@/views/Surname/Index.vue'
import SurnameAll from '@/views/Surname/All.vue'
import SurnameFirst from '@/views/Surname/First.vue'
import SurnameTop from '@/views/Surname/Top.vue'
import People from '@/views/People/Route.vue'
import PeopleSearch from '@/views/People/Search.vue'
import PeopleSearchAdvanced from '@/views/People/SearchAdvanced.vue'
import PeopleSingle from '@/views/People/Index.vue'
import PeopleSingleProfile from '@/views/People/Profile.vue'
import PeopleSingleFamily from '@/views/People/Family.vue'
import PeopleSinglePedigree from '@/views/People/Pedigree.vue'
import PeopleSingleDescend from '@/views/People/Descend.vue'
import PeopleSingleSuggest from '@/views/People/Suggest.vue'

import PeopleSingleTimeline from '@/views/People/Timeline.vue'
import PeopleSingleRelationship from '@/views/People/Relationship.vue'


import Family from '@/views/Family/Route.vue'
import FamilySearch from '@/views/Family/Search.vue'
import FamilySearchAdvanced from '@/views/Family/SearchAdvanced.vue'
import FamilySingle from '@/views/Family/Index.vue'
import FamilySingleChart from '@/views/Family/Chart.vue'
import FamilySingleGroup from '@/views/Family/Group.vue'
import FamilySingleSuggest from '@/views/Family/Suggest.vue'
import TreeRoute from '@/views/Tree/Route.vue'
import TreeIndex from '@/views/Tree/Index.vue'
import TreeSingle from '@/views/Tree/single/Index.vue'
import TreeSingleProfile from '@/views/Tree/single/Profile.vue'
import SiteRoute from '@/views/Site/Route.vue'
import SiteIndex from '@/views/Site/Index.vue'
import Note from '@/views/Note/Route.vue'
import NoteSearch from '@/views/Note/Search.vue'
import Place from '@/views/Place/Route.vue'
import PlaceSearch from '@/views/Place/Index.vue'
import PlaceSearchChar from '@/views/Place/Char.vue'
import PlaceSearchAll from '@/views/Place/All.vue'
import PlaceSearchLocality from '@/views/Place/Locality.vue'
import PlaceSearchLocalityEvent from '@/views/Place/LocalityEvent.vue'
import StatisticsRoute from '@/views/Statistics/Route.vue'
import StatisticsIndex from '@/views/Statistics/Index.vue'
import ReportRoute from '@/views/Report/Route.vue'
import ReportSingle from '@/views/Report/Single.vue'
import ReportIndex from '@/views/Report/Index.vue'
import ReportSingleProfile from '@/views/Report/SingleProfile.vue'
import AnniversariesRoute from '@/views/Anniversaries/Route.vue'
import Anniversaries from '@/views/Anniversaries/Index.vue'
import CalenderRoute from '@/views/Calender/Route.vue'
import Calender from '@/views/Calender/Index.vue'
import NewRoute from '@/views/New/Route.vue'
import NewIndex from '@/views/New/Index.vue'
const publicRoutes = [{
	path: '/',
	component: Route,
	children: [{
		path: '',
		name: 'home',
		component: Index,
	}, {
		path: '/people',
		component: People,
		children: [{
			path: 'search',
			name: 'people-search',
			component: PeopleSearch,
		}, {
			path: 'search/advanced',
			name: 'people-search-advanced',
			component: PeopleSearchAdvanced,
		}, {
			path: ':id',
			component: PeopleSingle,
			children: [{
				path: '',
				name: 'people-single',
				component: PeopleSingleProfile,
			}, {
				path: 'pedigree',
				name: 'people-pedigree',
				component: PeopleSinglePedigree,
			}, {
				path: 'descend',
				name: 'people-descend',
				component: PeopleSingleDescend,
			}, {
				path: 'suggest',
				name: 'people-suggest',
				component: PeopleSingleSuggest,
			}, {
				path: 'timeline',
				name: 'people-timeline',
				component: PeopleSingleTimeline,
			}, {
				path: 'relationship',
				name: 'people-relationship',
				component: PeopleSingleRelationship,
			}]
		}]
	}, {
		path: '/surname',
		component: SurnameRoute,
		children: [{
			path: '',
			name: 'surname-list',
			component: SurnameIndex,
		}, {
			path: 'all',
			name: 'surname-all',
			component: SurnameAll,
		}, {
			path: 'first/:char',
			name: 'surname-first',
			component: SurnameFirst,
		}, {
			path: 'top/:n',
			name: 'surname-top',
			component: SurnameTop,
		}]
	}, {
		path: '/family',
		component: Family,
		children: [{
			path: 'search',
			name: 'family-search',
			component: FamilySearch,
		}, {
			path: 'search/advanced',
			name: 'family-search-advanced',
			component: FamilySearchAdvanced,
		}, {
			path: ':id',
			component: FamilySingle,
			children: [{
				path: '',
				name: 'family-chart',
				component: FamilySingleChart,
			}, {
				path: 'group-sheet',
				name: 'family-group-sheet',
				component: FamilySingleGroup,
			}, {
				path: 'family-suggest',
				name: 'family-suggest',
				component: FamilySingleSuggest,
			}]
		}]
	}, {
		path: '/tree',
		component: TreeRoute,
		children: [{
			path: '',
			name: 'tree',
			component: TreeIndex,
		}, {
			path: ':gedcom',
			component: TreeSingle,
			children: [{
				path: '',
				name: 'tree-single',
				component: TreeSingleProfile,
			}]
		}]
	}, {
		path: '/note',
		component: Note,
		children: [{
			path: '',
			name: 'note-search',
			component: NoteSearch,
		}]
	}, {
		path: '/place',
		component: Place,
		children: [{
			path: '',
			name: 'place-search',
			component: PlaceSearch,
		}, {
			path: 'place-all',
			name: 'place-search-all',
			component: PlaceSearchAll,
		}, {
			path: 'first/:char',
			name: 'place-search-char',
			component: PlaceSearchChar,
		}, {
			path: 'locality/:place',
			name: 'place-search-locality',
			component: PlaceSearchLocality,
		}, {
			path: ':place',
			name: 'place-single',
			component: PlaceSearchLocalityEvent,
		}]
	}, {
		path: '/site',
		component: SiteRoute,
		children: [{
			path: '',
			name: 'site-search',
			component: SiteIndex,
		}]
	}, {
		path: '/new',
		component: NewRoute,
		children: [{
			path: '',
			name: 'new',
			component: NewIndex,
		}]
	}, {
		path: '/statistics',
		component: StatisticsRoute,
		children: [{
			path: '',
			name: 'statistics',
			component: StatisticsIndex,
		}]
	}, {
		path: '/anniversaries',
		component: AnniversariesRoute,
		children: [{
			path: '',
			name: 'anniversaries',
			component: Anniversaries,
		}]
	}, {
		path: '/calender',
		component: CalenderRoute,
		children: [{
			path: '',
			name: 'calender',
			component: Calender,
		}]
	}, {
		path: '/report',
		component: ReportRoute,
		children: [{
			path: '',
			name: 'reports',
			component: ReportIndex,
		}, {
			path: ':id',
			component: ReportSingle,
			children: [{
				path: '',
				name: 'report-single',
				component: ReportSingleProfile,
			}]
		}]
	}]
}]
export default publicRoutes