const venueAbbreviations: Record<string, string> = {
  'Advances in Neural Information Processing Systems': 'NeurIPS',
  'European Conference on Computer Vision': 'ECCV',
  'IEEE/CVF Conference on Computer Vision and Pattern Recognition': 'CVPR',
};

export function getVenueAbbreviation(venue?: string): string | undefined {
  if (!venue) return undefined;

  return venueAbbreviations[venue];
}
