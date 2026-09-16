'use client';

import React from 'react';
import { ToothAnatomyDiagram } from './ToothAnatomyDiagram';
import { ToothSubstancesDiagram } from './ToothSubstancesDiagram';
import { ToothTypesDiagram } from './ToothTypesDiagram';
import { FdiSchemeDiagram } from './FdiSchemeDiagram';
import { HygieneStepsDiagram } from './HygieneStepsDiagram';

interface VisualDiagramResolverProps {
  imageKey?: 'tooth-anatomy' | 'tooth-substances' | 'tooth-types' | 'fdi-scheme' | 'hygiene-steps' | string;
}

export function VisualDiagramResolver({ imageKey }: VisualDiagramResolverProps) {
  if (!imageKey) return null;

  switch (imageKey) {
    case 'tooth-anatomy':
      return <ToothAnatomyDiagram />;
    case 'tooth-substances':
      return <ToothSubstancesDiagram />;
    case 'tooth-types':
      return <ToothTypesDiagram />;
    case 'fdi-scheme':
      return <FdiSchemeDiagram />;
    case 'hygiene-steps':
      return <HygieneStepsDiagram />;
    default:
      return null;
  }
}

