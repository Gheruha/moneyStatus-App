import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://gqoapjuisebfofehlayy.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxb2FwanVpc2ViZm9mZWhsYXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MzMyODcsImV4cCI6MjAzMDQwOTI4N30.2nzaVOujEyNvD5UE4DV_QknG16Xe6fiFOCUE4cfuFlg'
);
