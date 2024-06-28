import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Squadreview from './general-pages/Squadreview'

const Dashboard = lazy(() => import('./dashboard/Dashboard'))

const StartSprint = lazy(() => import('./general-pages/Startsprint'))
const ExcelAuto = lazy(() => import('./general-pages/ExcelAuto'))
const SquadReview = lazy(() => import('./general-pages/Squadreview'))



export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard"></Redirect>
          </Route>
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route exact path="/general-pages/startsprint" component={ StartSprint } />
          <Route exact path="/general-pages/excelauto" component={ ExcelAuto } />
          <Route exact path="/general-pages/squadreview" component={ SquadReview } />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
