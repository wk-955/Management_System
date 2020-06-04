import React from 'react'
import loadable from '@loadable/component'
import Loading from '../components/Loading';

const Login= loadable(
  () => import('./Account/Login'),
  {
    fallback: <Loading />
  }
);

const Datamanager= loadable(
  () => import('./Datamanager'),
  {
    fallback: <Loading />
  }
);

const NotFound = loadable(
  () => import('./NotFound'),
  {
    fallback: <Loading />
  }
);

const Personal = loadable(
  () => import('./Personal'),
  {
    fallback: <Loading />
  }
);


const Register =loadable(
  () => import('./Account/Register'),
  {
    fallback: <Loading />
  }
);

const SucessReults =loadable(
  () => import('./Account/SucessReults'),
  {
    fallback: <Loading />
  }
);

const GroupMember =loadable(
  () => import('./GroupMember'),
  {
    fallback: <Loading />
  }
);

const ChangePassWord =loadable(
  () => import('./ChangePassWord'),
  {
    fallback: <Loading />
}
);

const Statistics =loadable(
  () => import('./Statistics'),
  {
    fallback: <Loading />
}
);

const ClassManager =loadable(
  () => import('./ClassManager'),
  {
    fallback: <Loading />
}
);

const MissionAnalysis =loadable(
  () => import('./MissionAnalysis'),
  {
    fallback: <Loading />
  }
);

const PersonalForm =loadable(
  () => import('./PersonalForm'),
  {
    fallback: <Loading />
  }
);

const CreatMission =loadable(
  () => import('./MissionManager/CreatMission'),
  {
    fallback: <Loading />
  }
);

const MissionSelectTable = loadable(
  () => import('./MissionManager/MissionSelectTable'),
  {
    fallback: <Loading />
  }
);

const MissionDetail =loadable(
  () => import('./MissionManager/MissionDetail'),
  {
    fallback: <Loading />
  }
);

const Overview =loadable(
  () => import('./DashBoard/OverView'),
  {
    fallback: <Loading />
  }
);

export {
    NotFound,
    Datamanager,
    Login,
    Personal,
    MissionSelectTable,
    MissionDetail,
    Register,
    GroupMember,
    SucessReults,
    ChangePassWord,
    Statistics,
    ClassManager,
    MissionAnalysis,
    PersonalForm,
    CreatMission,
    Overview
}