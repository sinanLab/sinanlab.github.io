import matplotlib.pyplot as plt

# Data for the bar graph
year = [2020, 2021, 2022, 2023, 2024]
citations_year = [1, 11, 62, 98, 107]

# Create a bar chart
fig, ax = plt.subplots(figsize=(5, 4))  # Resize the figure to make it smaller
bars = ax.bar(year, citations_year, color='lightblue', width=0.3, zorder=2)  # Thin bars with transparency

# Remove the box (spines)
for spine in ax.spines.values():
    spine.set_visible(False)

# Remove y ticks if you don't want them
ax.tick_params(axis='y', which='both', left=False, labelleft=False)

# Show the x-ticks and labels
ax.set_xticks(year)  # Set x-ticks for each year
ax.set_xticklabels(year)  # Display the years as labels on the x-axis

# Display citation count on top of each bar
for bar in bars:
    yval = bar.get_height()  # Get the height of the bar (citation count)
    ax.text(bar.get_x() + bar.get_width() / 2, yval + 0.5,  # Position above the bar
            str(int(yval)), ha='center', va='bottom', fontsize=14, zorder=3)

# Adjust layout to fit everything
plt.tight_layout()

# Set transparent background for the plot
fig.patch.set_alpha(0.0)  # Transparent background
ax.set_facecolor('none')  # Make axes background transparent

# Save the figure to a file (e.g., as PNG)
plt.savefig('bar_graph.png', dpi=300, transparent=True)  # Export as transparent PNG

# Show the plot (optional)
plt.show()
