import _ from 'lodash';

export const isTouchDevice = () => {
  return !!("undefined" != typeof document.documentElement.ontouchstart);
  // return true;
}

export const deg2Rad = (degrees) => {
  var pi = Math.PI;
  return degrees * (pi/180);
};

export const rad2Deg = (angle) => {
  return angle * (180 / Math.PI);
}



export const nth = (d) => {
  if (d > 3 && d < 21) return 'th'; 
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}


export const extractSelectedEntity = (props) => {
  let {
    currentSubreddit,
    currentNormID,
    diseases,
    symptoms
  } = props;

  let selectedSubreddit = null;
  let selectedNormID = null;
  
  try {
    selectedSubreddit =  _.find(diseases, r => { return r.subreddit === currentSubreddit.subreddit });
  } catch(e){
  
  }
  
  try {
    selectedNormID = _.find(symptoms, r => { return r.norm_id === currentNormID.norm_id });
  } catch(e){

  }

  let selectedEntity = _.isUndefined(selectedSubreddit) || _.isNull(selectedSubreddit) ? selectedNormID : selectedSubreddit;
  return selectedEntity;
}


export const isCurrentlySelected = (currentSubreddit, currentNormID) => {
    
  return !_.isNull(currentNormID) || !_.isNull(currentSubreddit);

}


export const windowSizeChanged = (prevProps, props) => {
  return prevProps.windowWidth !== props.windowWidth || prevProps.windowHeight !== props.windowHeight;
}

export const numberWithDelimiter = (number, delimiter, separator) => {
  try {
    var delimiter = delimiter || ",";
    var separator = separator || ".";
    
    var parts = number.toString().split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter);
    return parts.join(separator);
  } catch(e) {
    return number
  }
};

export const findDisease = (subreddit, diseases) => {
  try {
    
    return _.find(diseases, sr => { return sr.id === subreddit.id }).label;
  
  } catch(e){
    return "";
  }
};

export const findSymptom = (normID, symptoms) => {
  try {
    return _.find(symptoms, sr => { return sr.norm_id === normID.norm_id }).label;
  
  } catch(e){
    return "";
  }
};