export const INITIAL_STATE = {
  tracking:{
    progress_measure:0,
    score:null,
    objectives:{},
    finished:false,
  },
  scorm:null,
  user_profile:{
    id:undefined,
    name:"Unknown",
    learner_preference:{},
  },
  wait_for_user_profile:false,
  screen: 0,
  quiz: {
    all_products: [],
    current_products: [],
    current_product_index: 1,
    selected_dumpster: undefined
  },
  timer: 100
};