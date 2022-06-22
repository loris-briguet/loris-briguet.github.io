void followLast()
{
  for (int i = 0; i < numOfFaders - 1; i++)
  {
    fader[i].toValue(fader[numOfFaders - 1].value);
  }
}
