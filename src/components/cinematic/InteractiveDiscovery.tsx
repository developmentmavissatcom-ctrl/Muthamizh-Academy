import React from 'react';
import { Course } from '../../types';

export interface InteractiveDiscoveryProps {
  onSelectCourseById?: (courseId: string) => void;
  onOpenAstraWithCourse?: (course: Course) => void;
  onOpenApplyModal?: () => void;
}

export const InteractiveDiscovery: React.FC<InteractiveDiscoveryProps> = () => {
  return null;
};

export default InteractiveDiscovery;
