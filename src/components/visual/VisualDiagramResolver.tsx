'use client';

import React from 'react';
import { ToothAnatomyDiagram } from './ToothAnatomyDiagram';
import { PeriodontiumDiagram } from './PeriodontiumDiagram';
import { ToothSubstancesDiagram } from './ToothSubstancesDiagram';
import { ToothTypesDiagram } from './ToothTypesDiagram';
import { FdiSchemeDiagram } from './FdiSchemeDiagram';
import { CariesStagesDiagram } from './CariesStagesDiagram';
import { DentalInstrumentsDiagram } from './DentalInstrumentsDiagram';
import { HygieneStepsDiagram } from './HygieneStepsDiagram';

interface VisualDiagramResolverProps {
  imageKey?: string;
  initialPart?: string;
  onSelect?: (key: string) => void;
}

export function VisualDiagramResolver({
  imageKey,
  initialPart,
  onSelect,
}: VisualDiagramResolverProps) {
  if (!imageKey) return null;

  switch (imageKey) {
    case 'tooth-anatomy':
      return <ToothAnatomyDiagram initialPart={initialPart} onPartSelect={onSelect} />;
    case 'periodontium':
      return <PeriodontiumDiagram initialTissue={initialPart} onSelect={onSelect} />;
    case 'tooth-substances':
      return <ToothSubstancesDiagram onSelect={onSelect} />;
    case 'tooth-types':
      return <ToothTypesDiagram onSelect={onSelect} />;
    case 'fdi-scheme':
    case 'quadrants':
      return <FdiSchemeDiagram onSelect={onSelect} />;
    case 'caries-stages':
      return <CariesStagesDiagram initialStage={initialPart} onSelectStage={onSelect} />;
    case 'instruments':
      return <DentalInstrumentsDiagram initialInstrument={initialPart} onSelectInstrument={onSelect} />;
    case 'hygiene-steps':
      return <HygieneStepsDiagram onSelect={onSelect} />;
    default:
      return null;
  }
}
