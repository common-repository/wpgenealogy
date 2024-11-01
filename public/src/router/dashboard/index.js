import Route from '@/views/Dashboard/Route.vue'
import Index from '@/views/Dashboard/Index.vue'
import PeopleRoute from '@/views/Dashboard/People/Route.vue'
import PeopleSearch from '@/views/Dashboard/People/Search.vue'
import PeopleAdd from '@/views/Dashboard/People/Add.vue'
import PeopleReview from '@/views/Dashboard/People/Review.vue'
import PeopleReviewSingle from '@/views/Dashboard/People/ReviewSingle.vue'
import PeopleMerge from '@/views/Dashboard/People/Merge.vue'
import PeopleEdit from '@/views/Dashboard/People/Edit.vue'
import FamilyRoute from '@/views/Dashboard/Family/Route.vue'
import FamilySearch from '@/views/Dashboard/Family/Search.vue'
import FamilyAdd from '@/views/Dashboard/Family/Add.vue'
import FamilyEdit from '@/views/Dashboard/Family/Edit.vue'
import FamilyReview from '@/views/Dashboard/Family/Review.vue'
import FamilyReviewSingle from '@/views/Dashboard/Family/ReviewSingle.vue'
import EventTypeRoute from '@/views/Dashboard/EventType/Route.vue'
import EventTypeSearch from '@/views/Dashboard/EventType/Search.vue'
import EventTypeAdd from '@/views/Dashboard/EventType/Add.vue'
import EventTypeEdit from '@/views/Dashboard/EventType/Edit.vue'
import NoteRoute from '@/views/Dashboard/Note/Route.vue'
import NoteSearch from '@/views/Dashboard/Note/Search.vue'
import NoteEdit from '@/views/Dashboard/Note/Edit.vue'
import PlaceRoute from '@/views/Dashboard/Place/Route.vue'
import PlaceSearch from '@/views/Dashboard/Place/Search.vue'
import PlaceAdd from '@/views/Dashboard/Place/Add.vue'
import PlaceEdit from '@/views/Dashboard/Place/Edit.vue'
import TimelineRoute from '@/views/Dashboard/Timeline/Route.vue'
import TimelineSearch from '@/views/Dashboard/Timeline/Search.vue'
import TimelineAdd from '@/views/Dashboard/Timeline/Add.vue'
import TimelineEdit from '@/views/Dashboard/Timeline/Edit.vue'
import ReportRoute from '@/views/Dashboard/Report/Route.vue'
import ReportSearch from '@/views/Dashboard/Report/Search.vue'
import ReportAdd from '@/views/Dashboard/Report/Add.vue'
import ReportEdit from '@/views/Dashboard/Report/Edit.vue'
import SetupRoute from '@/views/Dashboard/Setup/Route.vue'
import SetupConfiguration from '@/views/Dashboard/Setup/Configuration.vue'
import SetupConfigurationGeneral from '@/views/Dashboard/Setup/Configuration/General.vue'
import SetupConfigurationLog from '@/views/Dashboard/Setup/Configuration/Log.vue'
import SetupConfigurationMap from '@/views/Dashboard/Setup/Configuration/Map.vue'
import SetupConfigurationImport from '@/views/Dashboard/Setup/Configuration/Import.vue'
import SetupConfigurationChart from '@/views/Dashboard/Setup/Configuration/Chart.vue'
import SetupConfigurationTemplate from '@/views/Dashboard/Setup/Configuration/Template.vue'
import SetupDiagnostics from '@/views/Dashboard/Setup/Diagnostics.vue'
import SetupTable from '@/views/Dashboard/Setup/Table.vue'
import MigrateRoute from '@/views/Dashboard/Migrate/Route.vue'
import Import from '@/views/Dashboard/Migrate/Import.vue'
import Export from '@/views/Dashboard/Migrate/Export.vue'
import SecondaryProcesses from '@/views/Dashboard/Migrate/SecondaryProcesses.vue'
import TreeRoute from '@/views/Dashboard/Tree/Route.vue'
import TreeSearch from '@/views/Dashboard/Tree/Search.vue'
import TreeAdd from '@/views/Dashboard/Tree/Add.vue'
import TreeEdit from '@/views/Dashboard/Tree/Edit.vue'
import BranchRoute from '@/views/Dashboard/Branch/Route.vue'
import BranchSearch from '@/views/Dashboard/Branch/Search.vue'
import BranchAdd from '@/views/Dashboard/Branch/Add.vue'
import BranchEdit from '@/views/Dashboard/Branch/Edit.vue'
import ChartRoute from '@/views/Dashboard/Chart/Route.vue'
import ChartSearch from '@/views/Dashboard/Chart/Search.vue'
import ChartAdd from '@/views/Dashboard/Chart/Add.vue'
import ChartEdit from '@/views/Dashboard/Chart/Edit.vue'
import UserRoute from '@/views/Dashboard/User/Route.vue'
import UserSearch from '@/views/Dashboard/User/Search.vue'
import UserAdd from '@/views/Dashboard/User/Add.vue'
import UserEdit from '@/views/Dashboard/User/Edit.vue'
const dashboardRoutes = [{
	path: '/dashboard',
	component: Route,
	children: [{
		path: '',
		name: 'dashboard',
		component: Index,
	}, {
		path: '/dashboard/people',
		component: PeopleRoute,
		children: [{
			path: '',
			name: 'dashboard-people-search',
			component: PeopleSearch,
		}, {
			path: 'add',
			name: 'people-add',
			component: PeopleAdd,
		}, {
			path: 'review',
			name: 'people-review',
			component: PeopleReview
		}, {
			path: 'review/:id',
			name: 'people-review-single',
			component: PeopleReviewSingle
		}, {
			path: 'merge',
			name: 'people-merge',
			component: PeopleMerge
		}, {
			path: 'edit/:id',
			name: 'people-edit',
			component: PeopleEdit
		}]
	}, {
		path: '/dashboard/family',
		component: FamilyRoute,
		children: [{
			path: '',
			name: 'dashboard-family-search',
			component: FamilySearch
		}, {
			path: 'add',
			name: 'family-add',
			component: FamilyAdd
		}, {
			path: 'review',
			name: 'family-review',
			component: FamilyReview
		}, {
			path: 'review/:id',
			name: 'family-review-single',
			component: FamilyReviewSingle
		}, {
			path: 'edit/:id',
			name: 'family-edit',
			component: FamilyEdit
		}]
	}, {
		path: '/dashboard/event-type',
		component: EventTypeRoute,
		children: [{
			path: '',
			name: 'dashboard-event-type-search',
			component: EventTypeSearch
		}, {
			path: 'add',
			name: 'event-type-add',
			component: EventTypeAdd
		}, {
			path: 'edit/:id',
			name: 'event-type-edit',
			component: EventTypeEdit
		}]
	}, {
		path: '/dashboard/note',
		component: NoteRoute,
		children: [{
			path: '',
			name: 'dashboard-note-search',
			component: NoteSearch
		}, {
			path: 'edit/:id',
			name: 'note-edit',
			component: NoteEdit
		}]
	}, {
		path: '/dashboard/place',
		component: PlaceRoute,
		children: [{
			path: '',
			name: 'dashboard-place-search',
			component: PlaceSearch
		}, {
			path: 'add',
			name: 'place-add',
			component: PlaceAdd
		}, {
			path: 'edit/:id',
			name: 'place-edit',
			component: PlaceEdit
		}]
	}, {
		path: '/dashboard/timeline',
		component: TimelineRoute,
		children: [{
			path: '',
			name: 'dashboard-timeline-search',
			component: TimelineSearch
		}, {
			path: 'add',
			name: 'timeline-add',
			component: TimelineAdd
		}, {
			path: 'edit/:id',
			name: 'timeline-edit',
			component: TimelineEdit
		}]
	}, {
		path: '/dashboard/report',
		component: ReportRoute,
		children: [{
			path: '',
			name: 'dashboard-report-search',
			component: ReportSearch
		}, {
			path: 'add',
			name: 'report-add',
			component: ReportAdd
		}, {
			path: 'edit/:id',
			name: 'report-edit',
			component: ReportEdit
		}]
	}, {
		path: '/dashboard/setup',
		component: SetupRoute,
		children: [{
			path: 'configuration',
			name: 'setup-configuration',
			component: SetupConfiguration
		}, {
			path: 'configuration/general',
			name: 'setup-configuration-general',
			component: SetupConfigurationGeneral
		}, {
			path: 'configuration/log',
			name: 'setup-configuration-log',
			component: SetupConfigurationLog
		}, {
			path: 'configuration/map',
			name: 'setup-configuration-map',
			component: SetupConfigurationMap
		}, {
			path: 'configuration/chart',
			name: 'setup-configuration-chart',
			component: SetupConfigurationChart
		}, {
			path: 'configuration/import',
			name: 'setup-configuration-import',
			component: SetupConfigurationImport
		}, {
			path: 'configuration/template',
			name: 'setup-configuration-template',
			component: SetupConfigurationTemplate
		}, {
			path: 'diagnostics',
			name: 'setup-diagnostics',
			component: SetupDiagnostics
		}, {
			path: 'table',
			name: 'setup-table',
			component: SetupTable
		}]
	}, {
		path: '/dashboard/migrate',
		component: MigrateRoute,
		children: [{
			path: '',
			name: 'import',
			component: Import
		}, {
			path: 'export',
			name: 'export',
			component: Export
		}, {
			path: 'secondary-processes',
			name: 'secondary-processes',
			component: SecondaryProcesses
		}]
	}, {
		path: '/dashboard/tree',
		component: TreeRoute,
		children: [{
			path: '',
			name: 'dashboard-tree-search',
			component: TreeSearch
		}, {
			path: 'add',
			name: 'tree-add',
			component: TreeAdd
		}, {
			path: 'edit/:id',
			name: 'tree-edit',
			component: TreeEdit
		}]
	}, {
		path: '/dashboard/branch',
		component: BranchRoute,
		children: [{
			path: '',
			name: 'dashboard-branch-search',
			component: BranchSearch
		}, {
			path: 'add',
			name: 'branch-add',
			component: BranchAdd
		}, {
			path: 'edit/:id',
			name: 'branch-edit',
			component: BranchEdit
		}]
	}, {
		path: '/dashboard/chart',
		component: ChartRoute,
		children: [{
			path: '',
			name: 'dashboard-chart-search',
			component: ChartSearch
		}, {
			path: 'add',
			name: 'chart-add',
			component: ChartAdd
		}, {
			path: 'edit/:id',
			name: 'chart-edit',
			component: ChartEdit
		}]
	}, {
		path: '/dashboard/user',
		component: UserRoute,
		children: [{
			path: '',
			name: 'dashboard-user-search',
			component: UserSearch
		}, {
			path: 'add',
			name: 'user-add',
			component: UserAdd
		}, {
			path: 'edit/:id',
			name: 'user-edit',
			component: UserEdit
		}]
	}]
}]
export default dashboardRoutes